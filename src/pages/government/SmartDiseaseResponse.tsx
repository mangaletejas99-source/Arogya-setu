import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, Award, BarChart3, BriefcaseMedical, ClipboardCheck, Filter,
  GitCompareArrows, MapPin, Search, ShieldCheck, Stethoscope, Users, XCircle,
} from 'lucide-react';
import {
  Area, AreaChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import {
  DEMO_DISTRICT_ALERTS, DEMO_DOCTORS, DEMO_DISEASES, SMART_RESPONSE_DEMO_DATA_NOTICE,
  demoActor, districtTrendTimeline, initialDeployments, initialRecognitions, rankingRubric,
  type AuditEntry, type DeploymentRecord, type DistrictAlert, type DemoDoctor,
  type RecognitionRecord, type WorkflowStatus, type ReviewStatus,
} from '../../data/mockSmartResponse';

type SectionId = 'alerts' | 'doctors' | 'recommendations' | 'deployments' | 'recognition' | 'analytics';
type RecommendationStatus = 'Suggested' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Additional Information Requested' | 'Assigned';
interface Recommendation {
  id: string;
  district: string;
  disease: string;
  doctorId: string;
  status: RecommendationStatus;
  createdOn: string;
  reason: string;
  missingInfo: string;
  rejectionReason?: string;
  deploymentId?: string;
}
interface OutcomeReview {
  deploymentId: string;
  note: string;
  reviewer: string;
  reviewedOn: string;
  verified: boolean;
}
interface PersistedState {
  deployments: DeploymentRecord[];
  recommendations: Recommendation[];
  recognitions: RecognitionRecord[];
  audit: AuditEntry[];
  outcomes: OutcomeReview[];
  alertStatusOverrides: Record<string, DistrictAlert['responseStatus']>;
  watchThreshold: number;
  highAlertThreshold: number;
}

const STORAGE_KEY = 'medivora_smart_disease_response_demo_v1';
const sections: { id: SectionId; label: string; icon: typeof Activity }[] = [
  { id: 'alerts', label: 'District Disease Alerts', icon: Activity },
  { id: 'doctors', label: 'Doctor Expertise & Rankings', icon: Stethoscope },
  { id: 'recommendations', label: 'Smart Deployment Recommendations', icon: GitCompareArrows },
  { id: 'deployments', label: 'Deployment Management', icon: BriefcaseMedical },
  { id: 'recognition', label: 'Doctor Recognition & Promotion Review', icon: Award },
  { id: 'analytics', label: 'Response Outcome Analytics', icon: BarChart3 },
];
const alertStatuses = ['All', 'Normal Monitoring', 'Watch', 'High Alert', 'Critical Review', 'Response in Progress', 'Under Control — Pending Verification'];
const workflowStatuses: WorkflowStatus[] = ['Draft', 'Pending Approval', 'Approved', 'Rejected', 'Assigned', 'In Progress', 'Completed', 'Cancelled'];
const reviewStatuses: ReviewStatus[] = ['Evidence Pending', 'Under Verification', 'Verified', 'Recognition Recommended', 'Promotion Review Requested', 'Decision Pending', 'Approved', 'Not Approved'];
const dateToday = () => new Date().toISOString().slice(0, 10);
let demoIdSequence = 0;
const makeId = (prefix: string) => `${prefix}-DEMO-${Date.now().toString(36).toUpperCase()}-${(++demoIdSequence).toString(36).toUpperCase()}`;
const isPlainObject = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null;
const uniqueById = <T extends { id: string }>(items: T[]) => {
  const seen = new Set<string>();
  return items.map((item, index) => {
    if (!seen.has(item.id)) {
      seen.add(item.id);
      return item;
    }
    const replacement = `${item.id}-${index + 1}`;
    seen.add(replacement);
    return { ...item, id: replacement };
  });
};

const initialState: PersistedState = {
  deployments: initialDeployments,
  recommendations: [],
  recognitions: initialRecognitions,
  audit: [],
  outcomes: [],
  alertStatusOverrides: {},
  watchThreshold: 10,
  highAlertThreshold: 30,
};

const loadState = (): { state: PersistedState; error: string } => {
  if (typeof window === 'undefined') return { state: initialState, error: '' };
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) return { state: initialState, error: '' };
    const parsed: unknown = JSON.parse(saved);
    if (!isPlainObject(parsed)
      || !Array.isArray(parsed.deployments)
      || !Array.isArray(parsed.recommendations)
      || !Array.isArray(parsed.recognitions)
      || !Array.isArray(parsed.audit)
      || !Array.isArray(parsed.outcomes)
      || !isPlainObject(parsed.alertStatusOverrides)) {
      return { state: initialState, error: 'Saved demo workflow data could not be read. The in-memory demo has been loaded; new changes may not persist.' };
    }
    const watchThreshold = typeof parsed.watchThreshold === 'number' && parsed.watchThreshold >= 1 && parsed.watchThreshold <= 1000
      ? parsed.watchThreshold : 10;
    const highAlertThreshold = typeof parsed.highAlertThreshold === 'number'
      && parsed.highAlertThreshold > watchThreshold && parsed.highAlertThreshold <= 1000
      ? parsed.highAlertThreshold : Math.max(30, watchThreshold + 1);
    return {
      state: {
        deployments: parsed.deployments as DeploymentRecord[],
        recommendations: uniqueById(parsed.recommendations as Recommendation[]),
        recognitions: parsed.recognitions as RecognitionRecord[],
        audit: parsed.audit as AuditEntry[],
        outcomes: parsed.outcomes as OutcomeReview[],
        alertStatusOverrides: parsed.alertStatusOverrides as Record<string, DistrictAlert['responseStatus']>,
        watchThreshold,
        highAlertThreshold,
      },
      error: '',
    };
  } catch {
    return { state: initialState, error: 'Saved demo workflow data could not be loaded. The in-memory demo has been loaded; new changes may not persist.' };
  }
};

const priorityClasses: Record<string, string> = {
  'Normal Monitoring': 'bg-emerald-100 text-emerald-900',
  Watch: 'bg-sky-100 text-sky-900',
  'High Alert': 'bg-amber-100 text-amber-950',
  'Critical Review': 'bg-rose-100 text-rose-900',
};
const statusClass = (status: string) => status === 'Approved' || status === 'Assigned' || status === 'In Progress' || status === 'Completed' || status === 'Verified' || status === 'Under Control — Pending Verification'
  ? 'bg-emerald-100 text-emerald-900'
  : status === 'Rejected' || status === 'Cancelled' || status === 'Not Approved'
    ? 'bg-slate-200 text-slate-700'
    : status === 'High Alert' || status === 'Critical Review' || status === 'Follow-up Required'
      ? 'bg-amber-100 text-amber-950' : 'bg-sky-100 text-sky-900';

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = 'bg-slate-100 text-slate-700' }) => (
  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${className}`}>{children}</span>
);

const Panel: React.FC<{ title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }> = ({
  title, subtitle, icon, children, className = '',
}) => (
  <section className={`space-y-4 rounded-lg border border-gov-gray-300 bg-white p-4 shadow-xs sm:p-5 ${className}`}>
    <div className="flex flex-col gap-2 border-b border-gov-gray-200 pb-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gov-navy">{icon}{title}</h2>
        {subtitle && <p className="mt-1 text-[11px] text-slate-500">{subtitle}</p>}
      </div>
    </div>
    {children}
  </section>
);

const toCsv = (rows: string[][]) => rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\r\n');

export const SmartDiseaseResponse: React.FC = () => {
  const { user } = useAuth();
  const [section, setSection] = useState<SectionId>('alerts');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedDisease, setSelectedDisease] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('6 periods');
  const [selectedAlertStatus, setSelectedAlertStatus] = useState('All');
  const [doctorSearch, setDoctorSearch] = useState('');
  const [doctorDistrict, setDoctorDistrict] = useState('All');
  const [doctorSpecialty, setDoctorSpecialty] = useState('All');
  const [doctorAvailability, setDoctorAvailability] = useState('All');
  const [rankingWeights, setRankingWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(rankingRubric.map((item) => [item.key, item.weight])));
  const [selectedDoctor, setSelectedDoctor] = useState<DemoDoctor | null>(null);
  const [compareDoctors, setCompareDoctors] = useState<string[]>([]);
  const [deploymentSearch, setDeploymentSearch] = useState('');
  const [deploymentFilter, setDeploymentFilter] = useState('All');
  const [recognitionFilter, setRecognitionFilter] = useState('All');
  const [recommendationDistrict, setRecommendationDistrict] = useState('Nashik');
  const [recommendationDisease, setRecommendationDisease] = useState('Viral Fever-X (fictional)');
  const [rejectReasons, setRejectReasons] = useState<Record<string, string>>({});
  const [deploymentRejectReasons, setDeploymentRejectReasons] = useState<Record<string, string>>({});
  const [rankingReviewDrafts, setRankingReviewDrafts] = useState<Record<string, string>>({});
  const [recognitionNoteDrafts, setRecognitionNoteDrafts] = useState<Record<string, string>>({});
  const [outcomeNote, setOutcomeNote] = useState('');
  const [outcomeDeploymentId, setOutcomeDeploymentId] = useState('');
  const [bannerMessage, setBannerMessage] = useState('');
  const [initialLoad] = useState(loadState);
  const [storageError, setStorageError] = useState(initialLoad.error);
  const [storedState, setStoredState] = useState<PersistedState>(initialLoad.state);
  const [watchThresholdInput, setWatchThresholdInput] = useState(String(initialLoad.state.watchThreshold));
  const [highThresholdInput, setHighThresholdInput] = useState(String(initialLoad.state.highAlertThreshold));
  const [expandedDeployment, setExpandedDeployment] = useState<string | null>(null);

  useEffect(() => {
    const handleStorageError = () => setStorageError('Could not save this demo workflow in browser storage. Changes remain only in this session.');
    window.addEventListener('medivora-demo-storage-error', handleStorageError);
    return () => window.removeEventListener('medivora-demo-storage-error', handleStorageError);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(storedState));
    } catch {
      window.dispatchEvent(new Event('medivora-demo-storage-error'));
    }
  }, [storedState]);

  const audit = (action: string, subject: string, reason: string) => ({
    at: new Date().toISOString(),
    actor: demoActor,
    action,
    subject,
    reason,
  });
  const updateState = (update: (current: PersistedState) => PersistedState) => setStoredState(update);

  const visibleAlerts = DEMO_DISTRICT_ALERTS.map((alert) => ({
    ...alert,
    priority: alert.changePercent >= storedState.highAlertThreshold
      && (alert.availableDoctors < alert.requiredPersonnel || (alert.occupancyPercent ?? 0) >= 80)
      ? 'High Alert' as const
      : alert.changePercent >= storedState.watchThreshold
        || alert.availableDoctors < alert.requiredPersonnel
        || (alert.occupancyPercent ?? 0) >= 75
        ? 'Watch' as const
        : 'Normal Monitoring' as const,
    responseStatus: storedState.alertStatusOverrides[alert.district]
      ?? (alert.responseStatus === 'Response in Progress' || alert.responseStatus === 'Under Control — Pending Verification'
        ? alert.responseStatus
        : alert.changePercent >= storedState.highAlertThreshold
          && (alert.availableDoctors < alert.requiredPersonnel || (alert.occupancyPercent ?? 0) >= 80)
          ? 'High Alert' as const
          : alert.changePercent >= storedState.watchThreshold
            || alert.availableDoctors < alert.requiredPersonnel
            || (alert.occupancyPercent ?? 0) >= 75
            ? 'Watch' as const
            : 'Normal Monitoring' as const),
  }));
  const filteredAlerts = visibleAlerts.filter((alert) =>
    (selectedDistrict === 'All' || alert.district === selectedDistrict)
    && (selectedDisease === 'All' || alert.disease === selectedDisease)
    && (selectedAlertStatus === 'All' || alert.responseStatus === selectedAlertStatus));
  const scoredDoctors = useMemo(() => DEMO_DOCTORS.map((doctor) => {
    const weightTotal = rankingRubric.reduce((sum, item) => sum + Math.max(0, rankingWeights[item.key] ?? 0), 0);
    const weightedScore = rankingRubric.reduce((sum, item) =>
      sum + doctor.rankingFactors[item.key as keyof DemoDoctor['rankingFactors']] * Math.max(0, rankingWeights[item.key] ?? 0), 0);
    return { ...doctor, score: weightTotal ? Math.round(weightedScore / weightTotal) : 0 };
  }), [rankingWeights]);
  const filteredDoctors = useMemo(() => scoredDoctors.filter((doctor) =>
    (doctorSearch.trim() === '' || `${doctor.name} ${doctor.id} ${doctor.expertise.join(' ')} ${doctor.specialty}`.toLowerCase().includes(doctorSearch.toLowerCase()))
    && (doctorDistrict === 'All' || doctor.district === doctorDistrict)
    && (doctorSpecialty === 'All' || doctor.specialty === doctorSpecialty)
    && (doctorAvailability === 'All' || doctor.availability === doctorAvailability)), [scoredDoctors, doctorSearch, doctorDistrict, doctorSpecialty, doctorAvailability]);
  const sortedLeaderboard = [...filteredDoctors].sort((a, b) => b.score - a.score);
  const filteredDeployments = storedState.deployments.filter((deployment) => {
    const doctor = DEMO_DOCTORS.find((item) => item.id === deployment.doctorId);
    const haystack = `${deployment.id} ${deployment.district} ${deployment.disease} ${doctor?.name ?? ''} ${doctor?.specialty ?? ''}`.toLowerCase();
    return (deploymentSearch === '' || haystack.includes(deploymentSearch.toLowerCase()))
      && (deploymentFilter === 'All' || deployment.approval === deploymentFilter || deployment.assignment === deploymentFilter);
  });
  const filteredRecognitions = storedState.recognitions.filter((item) => recognitionFilter === 'All' || item.status === recognitionFilter);

  const generateRecommendations = () => {
    const alert = visibleAlerts.find((item) => item.district === recommendationDistrict && item.disease === recommendationDisease);
    const candidates = scoredDoctors.filter((doctor) => doctor.eligible && doctor.availability === 'Available'
      && doctor.expertise.some((expertise) => expertise.toLowerCase().includes(recommendationDisease.split(' ')[0].toLowerCase()))
      && (alert ? doctor.district !== alert.district : true))
      .sort((a, b) => b.score - a.score);
    if (!alert) {
      setBannerMessage('No matching district alert is configured for that selection; no recommendation was generated.');
      return;
    }
    if (!['High Alert', 'Watch', 'Critical Review'].includes(alert.priority)
      && !['High Alert', 'Watch', 'Critical Review'].includes(alert.responseStatus)) {
      setBannerMessage('The selected district does not currently meet the configured demo review priority for additional deployment support.');
      return;
    }
    if (!candidates.length) {
      setBannerMessage('No available, eligible demo doctor has matching recorded expertise. Review staffing and data before considering deployment.');
      return;
    }
    const fresh: Recommendation[] = candidates.map((doctor) => ({
      id: makeId('REC'),
      district: alert.district,
      disease: alert.disease,
      doctorId: doctor.id,
      status: 'Suggested',
      createdOn: dateToday(),
      reason: `${alert.district} has ${alert.newCases} new reported demo cases (${alert.changePercent > 0 ? '+' : ''}${alert.changePercent}% over the illustrative period). Candidate has a scenario-matched expertise record; this is a suggestion, not a transfer decision.`,
      missingInfo: 'Confirm credentials with the proper authority, staffing coverage at the origin facility, consent/employment requirements, travel conditions, destination capacity, and approving officer.',
    }));
    updateState((current) => ({
      ...current,
      recommendations: [...fresh, ...current.recommendations],
      audit: [...fresh.map((item) => audit('Recommendation generated', item.id, item.reason)), ...current.audit],
    }));
    setSection('recommendations');
    setBannerMessage(`${fresh.length} demo recommendation${fresh.length === 1 ? '' : 's'} generated for authorized human review. No deployment order has been issued.`);
  };

  const approveRecommendation = (recommendation: Recommendation) => {
    const doctor = DEMO_DOCTORS.find((item) => item.id === recommendation.doctorId);
    if (!doctor || !doctor.eligible || doctor.availability !== 'Available') {
      setBannerMessage('This doctor is not marked available and eligible in the demo data. No approval was recorded.');
      return;
    }
    const deployment: DeploymentRecord = {
      id: makeId('DEP'),
      district: recommendation.district,
      disease: recommendation.disease,
      doctorId: recommendation.doctorId,
      origin: doctor.hospital,
      destination: DEMO_DISTRICT_ALERTS.find((item) => item.district === recommendation.district)?.facilities[0] ?? 'Destination facility pending',
      requestedOn: dateToday(),
      startsOn: '',
      endsOn: '',
      approval: 'Approved',
      assignment: 'Approved',
      approvingOfficer: demoActor,
      outcomeStatus: 'Not started',
      reason: 'Approved for demo workflow only. Verify staffing impact, employment rules, doctor agreement, and destination readiness before any real action.',
    };
    updateState((current) => ({
      ...current,
      recommendations: current.recommendations.map((item) => item.id === recommendation.id ? { ...item, status: 'Approved', deploymentId: deployment.id } : item),
      deployments: [deployment, ...current.deployments],
      audit: [audit('Demo recommendation approved for review workflow', recommendation.id, deployment.reason), ...current.audit],
    }));
    setBannerMessage(`${deployment.id} created in the local demo workflow. This is not an official deployment order.`);
  };

  const rejectRecommendation = (recommendation: Recommendation) => {
    const reason = rejectReasons[recommendation.id]?.trim();
    if (!reason) {
      setBannerMessage('Enter a rejection reason before recording this demo decision.');
      return;
    }
    updateState((current) => ({
      ...current,
      recommendations: current.recommendations.map((item) => item.id === recommendation.id ? { ...item, status: 'Rejected', rejectionReason: reason } : item),
      audit: [audit('Recommendation rejected', recommendation.id, reason), ...current.audit],
    }));
    setBannerMessage('The rejection reason and action were recorded in local demo audit history.');
  };

  const requestMoreInfo = (recommendation: Recommendation) => {
    updateState((current) => ({
      ...current,
      recommendations: current.recommendations.map((item) => item.id === recommendation.id ? { ...item, status: 'Additional Information Requested' } : item),
      audit: [audit('Additional information requested', recommendation.id, recommendation.missingInfo), ...current.audit],
    }));
    setBannerMessage('Additional information request recorded in the local demo workflow.');
  };

  const assignRecommendation = (recommendation: Recommendation) => {
    const deployment = storedState.deployments.find((item) => item.id === recommendation.deploymentId);
    if (!deployment || deployment.approval !== 'Approved') {
      setBannerMessage('A deployment request must be approved before assignment. Review it in Deployment Management.');
      return;
    }
    changeDeploymentStatus(deployment, 'Assigned');
    updateState((current) => ({
      ...current,
      recommendations: current.recommendations.map((item) => item.id === recommendation.id ? { ...item, status: 'Assigned' } : item),
    }));
  };

  const changeDeploymentStatus = (deployment: DeploymentRecord, status: WorkflowStatus) => {
    if (['Assigned', 'In Progress', 'Completed'].includes(status) && deployment.approval !== 'Approved') {
      setBannerMessage('Only an approved deployment can be assigned, started, or completed.');
      return;
    }
    if (status === 'Approved' && deployment.approval !== 'Pending Approval') {
      setBannerMessage('Only a deployment request pending approval may be approved.');
      return;
    }
    let rejectionReason: string | undefined;
    if (status === 'Rejected') {
      rejectionReason = deploymentRejectReasons[deployment.id]?.trim();
      if (!rejectionReason) {
        setBannerMessage('A rejection reason is required; no deployment status was changed.');
        return;
      }
    }
    updateState((current) => ({
      ...current,
      deployments: current.deployments.map((item) => item.id === deployment.id
        ? {
          ...item,
          assignment: status === 'Approved' ? 'Approved' : status,
          approval: status === 'Approved' || status === 'Rejected' || status === 'Pending Approval' || status === 'Draft' ? status : item.approval,
          ...(rejectionReason ? { rejectionReason } : {}),
        }
        : item),
      audit: [audit(`Deployment status changed to ${status}`, deployment.id, rejectionReason ?? 'Recorded by government dashboard demo user; local workflow only.'), ...current.audit],
    }));
    setBannerMessage(`Deployment ${deployment.id} changed to ${status} in the local demo workflow.`);
  };

  const advanceRecognition = (record: RecognitionRecord, status: ReviewStatus) => {
    updateState((current) => ({
      ...current,
      recognitions: current.recognitions.map((item) => item.id === record.id ? { ...item, status } : item),
      audit: [audit(`Recognition review changed to ${status}`, record.id, record.notes), ...current.audit],
    }));
    setBannerMessage(`Review status recorded as ${status}. A ranking does not determine promotion or employment action.`);
  };

  const saveRecognitionNotes = (record: RecognitionRecord) => {
    const notes = recognitionNoteDrafts[record.id]?.trim();
    if (!notes) {
      setBannerMessage('Add a review note before saving the recognition record.');
      return;
    }
    updateState((current) => ({
      ...current,
      recognitions: current.recognitions.map((item) => item.id === record.id
        ? { ...item, notes, reviewer: demoActor }
        : item),
      audit: [audit('Recognition review notes updated', record.id, notes), ...current.audit],
    }));
    setBannerMessage('Review notes and reviewer were saved in local demo audit history.');
  };

  const recordRankingReview = (doctor: DemoDoctor) => {
    const reviewNote = rankingReviewDrafts[doctor.id]?.trim();
    if (!reviewNote) {
      setBannerMessage('A review note is required before recording a ranking review.');
      return;
    }
    const weightSummary = rankingRubric.map((item) => `${item.key} ${rankingWeights[item.key] ?? 0}%`).join(', ');
    updateState((current) => ({
      ...current,
      audit: [audit('Ranking reviewed', doctor.id, `${reviewNote} Score ${doctor.score}/100; weights: ${weightSummary}.`), ...current.audit],
    }));
    setBannerMessage(`Ranking review for ${doctor.name} was recorded in the local audit history.`);
  };

  const verifyOutcome = (event: React.FormEvent) => {
    event.preventDefault();
    if (!outcomeDeploymentId || outcomeNote.trim().length < 12) {
      setBannerMessage('Select a deployment and enter a review note of at least 12 characters.');
      return;
    }
    const outcome = { deploymentId: outcomeDeploymentId, note: outcomeNote.trim(), reviewer: demoActor, reviewedOn: dateToday(), verified: true };
    updateState((current) => ({
      ...current,
      outcomes: [outcome, ...current.outcomes.filter((item) => item.deploymentId !== outcomeDeploymentId)],
      deployments: current.deployments.map((item) => item.id === outcomeDeploymentId ? { ...item, outcomeStatus: 'Outcome reviewed (demo)' } : item),
      audit: [audit('Outcome review recorded (demo)', outcomeDeploymentId, outcome.note), ...current.audit],
    }));
    setBannerMessage('Outcome review was saved in local demo audit history. Temporal change does not establish causation.');
    setOutcomeNote('');
  };

  const exportAlertCsv = () => {
    const csv = toCsv([
      ['District', 'Disease', 'New cases', 'Active cases', 'Change %', 'Occupancy %', 'Available doctors', 'Required personnel', 'Updated', 'Priority', 'Response status', 'Demo'],
      ...filteredAlerts.map((item) => [item.district, item.disease, String(item.newCases), item.activeCases === null ? '' : String(item.activeCases), String(item.changePercent), item.occupancyPercent === null ? '' : String(item.occupancyPercent), String(item.availableDoctors), String(item.requiredPersonnel), item.lastUpdated, item.priority, item.responseStatus, 'Yes']),
    ]);
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'medivora-demo-district-alerts.csv';
    anchor.click();
    URL.revokeObjectURL(url);
    setBannerMessage('Filtered demo district alert data exported to CSV.');
  };

  const changeAlertStatus = (alert: DistrictAlert, status: DistrictAlert['responseStatus']) => {
    const reason = `Manual demo status update. Current sample: ${alert.newCases} newly reported cases; authorized official review is required.`;
    updateState((current) => ({
      ...current,
      alertStatusOverrides: { ...current.alertStatusOverrides, [alert.district]: status },
      audit: [audit(`Alert status changed to ${status}`, alert.district, reason), ...current.audit],
    }));
    setBannerMessage(`${alert.district} status changed to ${status} in the local demo session. The source demo dataset remains unchanged.`);
  };

  const configureAlertThresholds = (watch: string, high: string) => {
    const watchThreshold = Number(watch);
    const highAlertThreshold = Number(high);
    if (!Number.isFinite(watchThreshold) || !Number.isFinite(highAlertThreshold)
      || watchThreshold < 1 || highAlertThreshold <= watchThreshold || highAlertThreshold > 1000) {
      setBannerMessage('Set a watch threshold of at least 1% and a higher alert threshold no greater than 1000%.');
      return;
    }
    updateState((current) => ({
      ...current,
      watchThreshold,
      highAlertThreshold,
      audit: [audit('Alert thresholds configured', 'District outbreak rules', `Watch at +${watchThreshold}%; High Alert at +${highAlertThreshold}% with staffing gap or occupancy of at least 80%.`), ...current.audit],
    }));
    setBannerMessage(`Demo thresholds saved: Watch +${watchThreshold}%, High Alert +${highAlertThreshold}% plus capacity/staffing rule.`);
  };

  const chartData = districtTrendTimeline.slice(-Number.parseInt(selectedPeriod, 10));

  return (
    <div className="space-y-5 text-xs">
      <header className="rounded-lg border border-gov-gray-300 bg-white p-4 shadow-xs sm:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gov-saffron">Government Health Administration</span>
              <Badge className="bg-amber-100 text-amber-950">DEMO • NO LIVE GOVERNMENT DATA</Badge>
            </div>
            <h1 className="mt-1 text-xl font-bold text-gov-navy sm:text-2xl">Smart Disease Response & Doctor Deployment</h1>
            <p className="mt-1 text-slate-600">Scenario planning, evidence review, and auditable local workflows for authorized administrators.</p>
            <p className="mt-1 text-[10px] text-slate-500">{SMART_RESPONSE_DEMO_DATA_NOTICE}</p>
          </div>
          <div className="rounded-md bg-slate-50 px-3 py-2 text-right">
            <span className="text-[10px] font-bold uppercase text-slate-500">Signed-in persona</span>
            <div className="font-bold text-gov-navy">{user.name}</div>
            <div className="text-[10px] text-slate-500">{user.designation}</div>
          </div>
        </div>
      </header>

      <nav aria-label="Smart response sections" className="grid grid-cols-1 gap-1 rounded-lg border border-gov-gray-300 bg-white p-2 shadow-xs sm:grid-cols-2 xl:grid-cols-3">
        {sections.map((item) => {
          const Icon = item.icon;
          return (
            <button key={item.id} type="button" onClick={() => setSection(item.id)} aria-current={section === item.id ? 'page' : undefined}
              className={`flex min-h-10 items-center gap-2 rounded px-3 py-2 text-left font-semibold transition ${section === item.id ? 'bg-gov-navy text-white' : 'text-slate-700 hover:bg-slate-100'}`}>
              <Icon className="h-4 w-4 shrink-0" /><span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {storageError && <div role="alert" className="rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-amber-950">{storageError}</div>}
      {bannerMessage && <div role="status" className="flex items-start justify-between gap-3 rounded-md border border-sky-200 bg-sky-50 px-3 py-2 text-sky-950"><span>{bannerMessage}</span><button type="button" aria-label="Dismiss message" onClick={() => setBannerMessage('')}><XCircle className="h-4 w-4" /></button></div>}

      {section === 'alerts' && (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ['Districts monitored', DEMO_DISTRICT_ALERTS.length, 'DEMO sample regions'],
              ['High / critical review', DEMO_DISTRICT_ALERTS.filter((item) => item.priority === 'High Alert' || item.priority === 'Critical Review').length, 'Configured alert rules'],
              ['Doctors available', DEMO_DOCTORS.filter((item) => item.availability === 'Available').length, 'Scenario directory'],
              ['Pending approvals', storedState.deployments.filter((item) => item.approval === 'Pending Approval').length, 'Local demo workflow'],
            ].map(([label, value, note]) => <div key={String(label)} className="rounded-lg border border-gov-gray-200 bg-white p-3 shadow-xs"><div className="text-[10px] font-bold uppercase text-slate-500">{label}</div><div className="mt-1 text-2xl font-black text-gov-navy">{value}</div><div className="text-[10px] text-slate-500">{note}</div></div>)}
          </div>

          <Panel title="District Disease Alerts" subtitle="Illustrative reported case counts only. Configured status labels support review; data are not connected to IDSP or any live service." icon={<MapPin className="h-4 w-4 text-gov-saffron" />}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
              <label className="text-[10px] font-semibold text-slate-600">District
                <select aria-label="Filter alert district" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">
                  {['All', ...DEMO_DISTRICT_ALERTS.map((item) => item.district)].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-600">Disease
                <select aria-label="Filter alert disease" value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">
                  {['All', ...DEMO_DISEASES].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-600">Reporting period
                <select aria-label="Select reporting period" value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">
                  {['3 periods', '4 periods', '5 periods', '6 periods'].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-[10px] font-semibold text-slate-600">Alert / response status
                <select aria-label="Filter alert status" value={selectedAlertStatus} onChange={(e) => setSelectedAlertStatus(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">
                  {alertStatuses.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <button type="button" onClick={exportAlertCsv} className="mt-auto inline-flex items-center justify-center gap-2 rounded bg-gov-navy px-3 py-2 font-bold text-white hover:bg-gov-navyLight"><Filter className="h-3.5 w-3.5" />Export filtered CSV</button>
            </div>

            <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
              <div className="rounded-md border border-slate-200 p-3">
                <h3 className="mb-1 font-bold text-gov-navy">Illustrative case trend • new reports / period</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    {selectedDisease === 'All' || selectedDisease === 'Viral Fever-X (fictional)' ? (
                    selectedDistrict === 'All' || ['Nashik', 'Dhule', 'District XYZ (fictional)'].includes(selectedDistrict) ? (
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="period" tick={{ fontSize: 9 }} />
                        <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                        <Tooltip /><Legend wrapperStyle={{ fontSize: 10 }} />
                        {(selectedDistrict === 'All' || selectedDistrict === 'Nashik') && <Line type="monotone" dataKey="nashik" name="Nashik demo cases" stroke="#0B3B60" strokeWidth={2} />}
                        {(selectedDistrict === 'All' || selectedDistrict === 'Dhule') && <Line type="monotone" dataKey="dhule" name="Dhule demo cases" stroke="#D9531E" strokeWidth={2} />}
                        {(selectedDistrict === 'All' || selectedDistrict.startsWith('District XYZ')) && <Line type="monotone" dataKey="districtXyz" name="District XYZ demo cases" stroke="#137333" strokeWidth={2} />}
                      </LineChart>
                    ) : <div className="flex h-full items-center justify-center px-4 text-center text-slate-600">No time-series data configured for {selectedDistrict} in this fictional scenario.</div>
                    ) : <div className="flex h-full items-center justify-center px-4 text-center text-slate-600">No trend series configured for {selectedDisease}; the table shows its available demo snapshot.</div>}
                  </ResponsiveContainer>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">Trend is illustrative, not a live surveillance signal or causal evaluation. Other districts are represented in the comparison table.</p>
              </div>
              <div className="rounded-md border border-slate-200 p-3">
                <h3 className="mb-1 font-bold text-gov-navy">Available vs required personnel • demo snapshot</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredAlerts}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="district" tick={{ fontSize: 8 }} interval={0} angle={-12} height={50} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10 }} />
                      <Tooltip /><Legend wrapperStyle={{ fontSize: 10 }} />
                      <Area type="monotone" dataKey="availableDoctors" name="Available demo doctors" stroke="#137333" fill="#bbf7d0" />
                      <Area type="monotone" dataKey="requiredPersonnel" name="Required demo personnel" stroke="#D9531E" fill="#fed7aa" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {filteredAlerts.length ? <div className="overflow-x-auto rounded-md border border-slate-200">
              <table className="w-full min-w-[1050px] text-left">
                <thead className="bg-slate-100 text-[10px] uppercase text-slate-700"><tr>
                  {['District', 'Disease', 'New / active', 'Change', 'Occupancy', 'Available / required', 'Updated', 'Priority / response', 'Action'].map((heading) => <th key={heading} className="p-2.5">{heading}</th>)}
                </tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAlerts.map((alert) => <tr key={alert.district} className="align-top hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-gov-navy">{alert.district}<div className="mt-1 text-[10px] font-normal text-slate-500">{alert.facilities.join(', ')}</div></td>
                    <td className="p-2.5">{alert.disease}</td>
                    <td className="p-2.5">{alert.newCases} new / {alert.activeCases ?? 'Not reported'} active</td>
                    <td className="p-2.5 font-semibold">{alert.changePercent > 0 ? '+' : ''}{alert.changePercent}%</td>
                    <td className="p-2.5">{alert.occupancyPercent === null ? 'Not reported' : `${alert.occupancyPercent}%`}</td>
                    <td className="p-2.5">{alert.availableDoctors} / {alert.requiredPersonnel}</td>
                    <td className="p-2.5">{alert.lastUpdated}</td>
                    <td className="p-2.5"><Badge className={priorityClasses[alert.priority]}>{alert.priority}</Badge><div className="mt-1"><Badge className={statusClass(alert.responseStatus)}>{alert.responseStatus}</Badge></div></td>
                    <td className="p-2.5"><select aria-label={`Update response status for ${alert.district}`} onChange={(e) => changeAlertStatus(alert, e.target.value as DistrictAlert['responseStatus'])} value={alert.responseStatus} className="rounded border border-slate-300 bg-white p-1.5">
                      {alertStatuses.slice(1).map((status) => <option key={status}>{status}</option>)}
                    </select></td>
                  </tr>)}
                </tbody>
              </table>
            </div> : <div className="rounded-md border border-slate-200 bg-slate-50 p-5 text-center text-slate-600">No district alerts match the selected filters.</div>}
            <details className="rounded border border-slate-200 p-3">
              <summary className="cursor-pointer font-bold text-gov-navy">Configurable demo alert rules</summary>
              <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1fr_auto]">
                <label className="text-[10px] font-semibold text-slate-600">Watch increase threshold (%)
                  <input aria-label="Watch increase threshold" type="number" min="1" max="1000" value={watchThresholdInput} onChange={(e) => setWatchThresholdInput(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 p-2 text-xs" />
                </label>
                <label className="text-[10px] font-semibold text-slate-600">High-alert increase threshold (%)
                  <input aria-label="High-alert increase threshold" type="number" min="1" max="1000" value={highThresholdInput} onChange={(e) => setHighThresholdInput(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 p-2 text-xs" />
                </label>
                <button type="button" onClick={() => configureAlertThresholds(watchThresholdInput, highThresholdInput)} className="mt-auto rounded bg-gov-navy px-3 py-2 font-bold text-white">Save thresholds</button>
              </div>
              <ul className="mt-2 list-inside list-disc space-y-1 text-slate-600">
                <li>Watch when period-over-period new-case change is at least {storedState.watchThreshold}%, or a staffing gap / occupancy of 75% or greater merits review.</li>
                <li>High Alert when new-case change is at least {storedState.highAlertThreshold}% and there is a staffing gap or occupancy of 80% or greater.</li>
                <li>Critical Review requires authorized epidemiology review; this demo does not automatically create critical alerts.</li>
                <li>Under Control remains pending verification; it is never treated as confirmed control by this prototype.</li>
              </ul>
            </details>
          </Panel>
        </>
      )}

      {section === 'doctors' && (
        <Panel title="Doctor Expertise & Transparent Rankings" subtitle="Fictional profile records. All registration/evidence statements shown are scenario placeholders, not externally verified credentials." icon={<Users className="h-4 w-4 text-gov-saffron" />}>
          <div className="rounded-md border border-sky-200 bg-sky-50 p-3 text-sky-950">
            <div className="font-bold">Configurable ranking rubric • human review required</div>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">{rankingRubric.map((item) => <label key={item.key} className="flex items-center justify-between gap-3"><span>{item.factor}</span><span className="flex items-center gap-1"><input aria-label={`Weight for ${item.factor}`} type="number" min="0" max="100" value={rankingWeights[item.key] ?? 0} onChange={(e) => setRankingWeights((current) => ({ ...current, [item.key]: Math.max(0, Math.min(100, Number(e.target.value) || 0)) }))} className="w-16 rounded border border-sky-300 bg-white p-1 text-right text-xs" /><strong>%</strong></span></label>)}</div>
            <p className="mt-2 text-[10px]">Current total weight: {rankingRubric.reduce((sum, item) => sum + (rankingWeights[item.key] ?? 0), 0)}% (weights are normalized to calculate the score). Scores are scenario examples; no factor uses raw recovery counts or observed outbreak decline. Severity, population, resources, reporting completeness and safety require contextual review. A score cannot decide promotion, discipline or transfer.</p>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <label className="text-[10px] font-semibold text-slate-600">Search doctors / expertise<input aria-label="Search doctors" value={doctorSearch} onChange={(e) => setDoctorSearch(e.target.value)} placeholder="Name, ID, expertise" className="mt-1 block w-full rounded border border-slate-300 p-2 text-xs" /></label>
            <label className="text-[10px] font-semibold text-slate-600">District<select aria-label="Filter doctor district" value={doctorDistrict} onChange={(e) => setDoctorDistrict(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">{['All', ...new Set(DEMO_DOCTORS.map((doctor) => doctor.district))].map((district) => <option key={district}>{district}</option>)}</select></label>
            <label className="text-[10px] font-semibold text-slate-600">Specialty<select aria-label="Filter doctor specialty" value={doctorSpecialty} onChange={(e) => setDoctorSpecialty(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">{['All', ...new Set(DEMO_DOCTORS.map((doctor) => doctor.specialty))].map((specialty) => <option key={specialty}>{specialty}</option>)}</select></label>
            <label className="text-[10px] font-semibold text-slate-600">Availability<select aria-label="Filter doctor availability" value={doctorAvailability} onChange={(e) => setDoctorAvailability(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">{['All', 'Available', 'Limited availability', 'Unavailable'].map((availability) => <option key={availability}>{availability}</option>)}</select></label>
          </div>
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="w-full min-w-[900px] text-left">
              <thead className="bg-slate-100 text-[10px] uppercase"><tr>{['Rank', 'Doctor • Demo ID', 'Expertise', 'District / facility', 'Availability / workload', 'Scenario score', 'Evidence state', 'Compare / profile'].map((heading) => <th key={heading} className="p-2.5">{heading}</th>)}</tr></thead>
              <tbody className="divide-y divide-slate-100">{sortedLeaderboard.map((doctor, index) => <tr key={doctor.id} className="align-top hover:bg-slate-50">
                <td className="p-2.5 font-bold text-gov-navy">#{index + 1}<div className="text-[10px] font-normal">{doctor.specialtyRank} in specialty</div></td>
                <td className="p-2.5 font-semibold">{doctor.name}<div className="font-mono text-[10px] text-slate-500">{doctor.id}</div><div className="mt-1 text-[10px]">{doctor.qualifications}</div><div className="mt-1"><Badge className="bg-amber-100 text-amber-950">{doctor.registrationStatus}</Badge></div></td>
                <td className="p-2.5">{doctor.specialty}<div className="mt-1 text-[10px] text-slate-500">{doctor.expertise.join(', ')}</div></td>
                <td className="p-2.5">{doctor.district}<div className="text-[10px] text-slate-500">{doctor.hospital}</div></td>
                <td className="p-2.5"><Badge className={doctor.availability === 'Available' ? 'bg-emerald-100 text-emerald-900' : 'bg-slate-100 text-slate-700'}>{doctor.availability}</Badge><div className="mt-1">{doctor.workload}</div>{!doctor.eligible && <div className="mt-1 text-[10px] font-semibold text-amber-900">Not eligible in this scenario</div>}</td>
                <td className="p-2.5"><span className="text-lg font-black text-gov-navy">{doctor.score}</span>/100<div className="text-[10px]">{doctor.expertiseCategory}</div><div className="text-[10px] text-slate-500">Period: {doctor.period}</div><div className="text-[10px] text-slate-500">Review: {doctor.reviewedOn}</div><div className="mt-1 grid grid-cols-2 gap-x-1 text-[9px] text-slate-500">{rankingRubric.map((item) => <span key={item.key}>{item.key}: {doctor.rankingFactors[item.key as keyof DemoDoctor['rankingFactors']]}/100</span>)}</div></td>
                <td className="p-2.5"><ul className="list-inside list-disc text-[10px]">{doctor.evidence.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></td>
                <td className="p-2.5"><div className="flex min-w-[160px] flex-col gap-2"><button type="button" onClick={() => setSelectedDoctor(doctor)} className="rounded bg-gov-navy px-2 py-1.5 font-bold text-white">View profile</button><input aria-label={`Ranking review note for ${doctor.name}`} value={rankingReviewDrafts[doctor.id] ?? ''} onChange={(e) => setRankingReviewDrafts((current) => ({ ...current, [doctor.id]: e.target.value }))} placeholder="Authorized review note" className="w-full rounded border border-slate-300 p-2" /><button type="button" onClick={() => recordRankingReview(doctor)} className="rounded border border-slate-300 px-2 py-1.5 font-semibold">Record ranking review</button><label className="flex items-center gap-1"><input type="checkbox" checked={compareDoctors.includes(doctor.id)} onChange={(e) => setCompareDoctors((current) => e.target.checked ? [...current, doctor.id].slice(-3) : current.filter((id) => id !== doctor.id))} />Compare</label></div></td>
              </tr>)}</tbody>
            </table>
          </div>
          {!filteredDoctors.length && <p className="rounded bg-slate-50 p-4 text-center text-slate-600">No doctor profiles match those filters.</p>}
          {compareDoctors.length > 0 && <div className="rounded-md border border-sky-200 bg-sky-50 p-3"><h3 className="flex items-center gap-2 font-bold text-gov-navy"><GitCompareArrows className="h-4 w-4" />Compare suitable doctors</h3><div className="mt-2 grid grid-cols-1 gap-2 md:grid-cols-3">{compareDoctors.map((id) => scoredDoctors.find((doctor) => doctor.id === id)).filter((doctor): doctor is DemoDoctor => Boolean(doctor)).map((doctor) => <div key={doctor.id} className="rounded bg-white p-3"><strong>{doctor.name}</strong><div>{doctor.specialty} • score {doctor.score}</div><div>{doctor.availability} • {doctor.workload}</div><div>Experience: {doctor.assignments.join('; ')}</div><div>Origin staffing: must be independently reviewed.</div></div>)}</div></div>}
        </Panel>
      )}

      {section === 'doctors' && selectedDoctor && (
        <div role="dialog" aria-modal="true" aria-labelledby="doctor-detail-heading" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-3 sm:p-6">
          <div className="my-4 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-gov-gray-300 bg-white shadow-2xl">
            <div className="sticky top-0 flex items-start justify-between gap-3 bg-gov-navy p-4 text-white">
              <div><h2 id="doctor-detail-heading" className="text-base font-bold">{selectedDoctor.name} • {selectedDoctor.id}</h2><p className="text-xs text-slate-200">DEMO PROFILE • fictional doctor</p></div>
              <button type="button" aria-label="Close doctor profile" onClick={() => setSelectedDoctor(null)} className="rounded px-2 py-1 hover:bg-white/10">Close</button>
            </div>
            <div className="space-y-4 p-4 text-xs">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div><strong>Qualifications</strong><div>{selectedDoctor.qualifications}</div><Badge className="mt-1 bg-amber-100 text-amber-950">{selectedDoctor.registrationStatus}</Badge></div>
                <div><strong>Specialty / disease expertise</strong><div>{selectedDoctor.specialty} • {selectedDoctor.expertise.join(', ')}</div></div>
                <div><strong>Facility / district</strong><div>{selectedDoctor.hospital} • {selectedDoctor.district}</div></div>
                <div><strong>Availability / workload</strong><div>{selectedDoctor.availability} • {selectedDoctor.workload}</div></div>
                <div><strong>Languages</strong><div>{selectedDoctor.languages.join(', ')}</div></div>
                <div><strong>Previous assignments</strong><div>{selectedDoctor.assignments.join('; ') || 'None recorded'}</div></div>
                <div><strong>Training / certifications</strong><div>{selectedDoctor.training.join('; ') || 'None recorded'}</div></div>
                <div><strong>Performance evaluation</strong><div>{selectedDoctor.score}/100 • {selectedDoctor.period} • Reviewed {selectedDoctor.reviewedOn}</div><div>{selectedDoctor.reviewStatus}</div><div className="mt-1">{rankingRubric.map((item) => <div key={item.key}>{item.factor}: {selectedDoctor.rankingFactors[item.key as keyof DemoDoctor['rankingFactors']]}/100 × {rankingWeights[item.key]}% weight</div>)}</div></div>
                <div><strong>Scenario recognition</strong><div>{selectedDoctor.awards.join('; ') || 'No recognition record'}</div></div>
                <div><strong>Deployment eligibility</strong><div>{selectedDoctor.eligible ? 'Eligible for consideration in this demo scenario only' : 'Not eligible in this scenario'}</div></div>
              </div>
              <div><h3 className="font-bold text-gov-navy">Evidence supporting score</h3><ul className="mt-1 list-inside list-disc">{selectedDoctor.evidence.map((evidence) => <li key={evidence}>{evidence}</li>)}</ul></div>
              <div className="rounded bg-amber-50 p-3 text-amber-950">No live credential check is connected. Verify qualifications and registration through official channels before any real staffing decision. Final review belongs to authorized officials.</div>
            </div>
          </div>
        </div>
      )}

      {section === 'recommendations' && (
        <Panel title="Smart Deployment Recommendation Engine" subtitle="Produces scenario-matched candidates for authorized human consideration. It never transfers doctors or issues orders." icon={<GitCompareArrows className="h-4 w-4 text-gov-saffron" />}>
          <div className="grid grid-cols-1 gap-3 rounded-md border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_auto]">
            <label className="text-[10px] font-semibold text-slate-600">Target district
              <select aria-label="Recommendation target district" value={recommendationDistrict} onChange={(e) => setRecommendationDistrict(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">{DEMO_DISTRICT_ALERTS.map((alert) => <option key={alert.district}>{alert.district}</option>)}</select>
            </label>
            <label className="text-[10px] font-semibold text-slate-600">Disease / scenario
              <select aria-label="Recommendation disease" value={recommendationDisease} onChange={(e) => setRecommendationDisease(e.target.value)} className="mt-1 block w-full rounded border border-slate-300 bg-white p-2 text-xs">{DEMO_DISEASES.map((disease) => <option key={disease}>{disease}</option>)}</select>
            </label>
            <button type="button" onClick={generateRecommendations} className="mt-auto inline-flex items-center justify-center gap-2 rounded bg-gov-navy px-4 py-2.5 font-bold text-white hover:bg-gov-navyLight"><Search className="h-4 w-4" />Generate demo recommendations</button>
          </div>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-950"><strong>Decision safeguards:</strong> Recommendations account for recorded matching expertise, availability and scenario eligibility. Origin staffing, verified credentials, patient safety, travel, consent, employment rules and destination readiness still require authorized review.</div>
          {storedState.recommendations.length ? <div className="space-y-3">{storedState.recommendations.map((item) => {
            const doctor = scoredDoctors.find((profile) => profile.id === item.doctorId);
            const deployment = storedState.deployments.find((row) => row.id === item.deploymentId);
            const status = item.status === 'Approved' && deployment ? deployment.assignment : item.status;
            return <article key={item.id} className="rounded-lg border border-gov-gray-200 bg-white p-4 shadow-xs">
              <div className="flex flex-wrap items-start justify-between gap-2"><div><div className="font-bold text-gov-navy">{item.district} • {item.disease}</div><div className="mt-1 text-[10px] text-slate-500">{item.id} • generated {item.createdOn}</div></div><Badge className={statusClass(status)}>{status}</Badge></div>
              {doctor ? <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
                <div><strong>Recommended doctor</strong><div>{doctor.name} • {doctor.id}</div><div>{doctor.specialty}</div><div>{doctor.hospital} • {doctor.district}</div></div>
                <div><strong>Expertise / evidence</strong><div>{doctor.expertise.join(', ')}</div><div className="text-[10px]">Relevant experience: {doctor.assignments.join('; ')}</div><div className="text-[10px]">Scenario match score: {doctor.score}/100; {doctor.reviewStatus}</div></div>
                <div><strong>Availability / impact</strong><div>{doctor.availability} • {doctor.workload}</div><div className="text-[10px]">Origin facility staffing impact requires direct review. No reliable travel-distance data is available.</div><div className="text-[10px]">Suggested period: 7 days, subject to approval.</div></div>
              </div> : <div className="mt-2 text-rose-800">Doctor profile unavailable; recommendation cannot be approved.</div>}
              <p className="mt-3 border-t border-slate-100 pt-2 text-slate-700">{item.reason}</p>
              <p className="mt-1 text-[10px] text-slate-500">Outstanding: {item.missingInfo}</p>
              {item.rejectionReason && <p className="mt-1 text-rose-800">Rejection reason: {item.rejectionReason}</p>}
              {item.status !== 'Approved' && item.status !== 'Rejected' && item.status !== 'Assigned' && <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto_auto_auto]">
                <input aria-label={`Rejection reason for ${item.id}`} value={rejectReasons[item.id] ?? ''} onChange={(e) => setRejectReasons((current) => ({ ...current, [item.id]: e.target.value }))} placeholder="Required reason to reject" className="min-w-0 rounded border border-slate-300 p-2" />
                <button type="button" disabled={!doctor?.eligible || doctor.availability !== 'Available'} onClick={() => approveRecommendation(item)} className="rounded bg-emerald-800 px-3 py-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-400">Approve for demo workflow</button>
                <button type="button" onClick={() => rejectRecommendation(item)} className="rounded border border-rose-300 bg-white px-3 py-2 font-bold text-rose-800">Reject</button>
                <button type="button" onClick={() => requestMoreInfo(item)} className="rounded border border-slate-300 bg-white px-3 py-2 font-bold text-slate-700">Request information</button>
              </div>}
              {item.status === 'Approved' && deployment && <div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => assignRecommendation(item)} disabled={deployment.assignment !== 'Approved'} className="rounded bg-gov-navy px-3 py-2 font-bold text-white disabled:bg-slate-400">Assign in demo workflow</button><span className="self-center text-[10px] text-slate-600">Request {deployment.id} • deployment starts only after separate authorized action</span></div>}
            </article>;
          })}</div> : <div className="rounded border border-dashed border-slate-300 p-6 text-center text-slate-600">No recommendations generated. Choose a target alert and generate demo candidates.</div>}
        </Panel>
      )}

      {section === 'deployments' && (
        <Panel title="Deployment Management" subtitle="Local prototype workflow only. These records are not transmitted as official orders or to a backend." icon={<BriefcaseMedical className="h-4 w-4 text-gov-saffron" />}>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <label className="relative"><Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" /><input aria-label="Search deployments" value={deploymentSearch} onChange={(e) => setDeploymentSearch(e.target.value)} placeholder="Search deployment, doctor, district" className="w-full rounded border border-slate-300 py-2 pl-8 pr-2" /></label>
            <select aria-label="Filter deployment status" value={deploymentFilter} onChange={(e) => setDeploymentFilter(e.target.value)} className="rounded border border-slate-300 bg-white p-2">{['All', ...workflowStatuses].map((status) => <option key={status}>{status}</option>)}</select>
          </div>
          {filteredDeployments.length ? <div className="overflow-x-auto rounded-md border border-slate-200"><table className="w-full min-w-[1200px] text-left">
            <thead className="bg-slate-100 text-[10px] uppercase"><tr>{['Deployment / target', 'Assignment / disease', 'Doctor / specialty', 'Origin → destination', 'Requested / dates', 'Approval / assignment', 'Approving officer', 'Outcome', 'Workflow'].map((heading) => <th key={heading} className="p-2.5">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredDeployments.map((deployment) => {
              const doctor = DEMO_DOCTORS.find((item) => item.id === deployment.doctorId);
              return <React.Fragment key={deployment.id}><tr className="align-top hover:bg-slate-50">
                <td className="p-2.5 font-bold">{deployment.id}<div>{deployment.district}</div></td>
                <td className="p-2.5">{deployment.disease}</td>
                <td className="p-2.5">{doctor?.name ?? deployment.doctorId}<div>{doctor?.specialty ?? 'Specialty not recorded'}</div></td>
                <td className="p-2.5">{deployment.origin}<br />→ {deployment.destination}</td>
                <td className="p-2.5">Request: {deployment.requestedOn}<br />Start: {deployment.startsOn || 'Pending'}<br />End: {deployment.endsOn || 'Pending'}</td>
                <td className="p-2.5"><Badge className={statusClass(deployment.approval)}>{deployment.approval}</Badge><div className="mt-1"><Badge className={statusClass(deployment.assignment)}>{deployment.assignment}</Badge></div></td>
                <td className="p-2.5">{deployment.approvingOfficer}</td>
                <td className="p-2.5">{deployment.outcomeStatus}</td>
                <td className="p-2.5"><button type="button" onClick={() => setExpandedDeployment(expandedDeployment === deployment.id ? null : deployment.id)} className="mb-2 rounded border border-slate-300 px-2 py-1 font-semibold">Details</button><select aria-label={`Change status for ${deployment.id}`} value={deployment.assignment} onChange={(e) => changeDeploymentStatus(deployment, e.target.value as WorkflowStatus)} className="block max-w-[150px] rounded border border-slate-300 bg-white p-1.5"><option value={deployment.assignment}>{deployment.assignment}</option>{workflowStatuses.filter((status) => status !== deployment.assignment).map((status) => <option key={status}>{status}</option>)}</select><input aria-label={`Deployment rejection reason for ${deployment.id}`} value={deploymentRejectReasons[deployment.id] ?? ''} onChange={(e) => setDeploymentRejectReasons((current) => ({ ...current, [deployment.id]: e.target.value }))} placeholder="Reason required to reject" className="mt-1 w-full rounded border border-slate-300 p-1.5" /></td>
              </tr>{expandedDeployment === deployment.id && <tr><td colSpan={9} className="bg-slate-50 p-3"><div><strong>Request rationale:</strong> {deployment.reason}</div>{deployment.rejectionReason && <div><strong>Rejection rationale:</strong> {deployment.rejectionReason}</div>}<div className="mt-1 text-[10px] text-slate-500">Status history available in audit log below. This is a local demo record only.</div></td></tr>}</React.Fragment>;
            })}</tbody>
          </table></div> : <div className="rounded border border-slate-200 bg-slate-50 p-5 text-center">No deployment records match the selected filter.</div>}
          <div className="rounded-md border border-slate-200 p-3"><h3 className="font-bold text-gov-navy">Audited local action history</h3>{storedState.audit.length ? <ol className="mt-2 max-h-56 space-y-2 overflow-y-auto">{storedState.audit.map((entry, index) => <li key={`${entry.at}-${index}`} className="border-t border-slate-100 pt-2"><strong>{entry.action}</strong> • {entry.subject}<div className="text-[10px] text-slate-500">{entry.at} • {entry.actor} • {entry.reason}</div></li>)}</ol> : <p className="mt-2 text-slate-500">No actions recorded yet in this browser session.</p>}</div>
        </Panel>
      )}

      {section === 'recognition' && (
        <Panel title="Doctor Recognition & Promotion Review" subtitle="No score or achievement guarantees an award or promotion. Final decisions belong to authorized reviewers under applicable service rules." icon={<Award className="h-4 w-4 text-gov-saffron" />}>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-950">Evidence and awards below are fictional demo records. Verify evidence, reviewer authority, applicable rules, and approval history outside this prototype before any real decision.</div>
          <select aria-label="Filter recognition status" value={recognitionFilter} onChange={(e) => setRecognitionFilter(e.target.value)} className="rounded border border-slate-300 bg-white p-2">{['All', ...reviewStatuses].map((status) => <option key={status}>{status}</option>)}</select>
          {filteredRecognitions.length ? <div className="overflow-x-auto rounded-md border border-slate-200"><table className="w-full min-w-[950px] text-left">
            <thead className="bg-slate-100 text-[10px] uppercase"><tr>{['Doctor / demo score', 'Achievement claim (scenario)', 'Supporting evidence', 'Period / reviewer', 'Recommendation / notes', 'Review status / action'].map((heading) => <th key={heading} className="p-2.5">{heading}</th>)}</tr></thead>
            <tbody className="divide-y divide-slate-100">{filteredRecognitions.map((record) => {
              const doctor = DEMO_DOCTORS.find((item) => item.id === record.doctorId);
              return <tr key={record.id} className="align-top"><td className="p-2.5">{doctor?.name}<div>{doctor?.id}</div><div>Score: {doctor?.score ?? 'N/A'}</div></td><td className="p-2.5">{record.achievement}</td><td className="p-2.5">{record.evidence}</td><td className="p-2.5">{record.period}<div>{record.reviewer}</div></td><td className="p-2.5">{record.recommendation}<div className="text-[10px] text-slate-500">{record.notes}</div><textarea aria-label={`Review notes for ${record.id}`} value={recognitionNoteDrafts[record.id] ?? record.notes} onChange={(e) => setRecognitionNoteDrafts((current) => ({ ...current, [record.id]: e.target.value }))} className="mt-2 block w-full rounded border border-slate-300 p-2" rows={3} /><button type="button" onClick={() => saveRecognitionNotes(record)} className="mt-1 rounded border border-slate-300 bg-white px-2 py-1 font-semibold">Save notes</button></td><td className="p-2.5"><Badge className={statusClass(record.status)}>{record.status}</Badge><select aria-label={`Update review status for ${record.id}`} value={record.status} onChange={(e) => advanceRecognition(record, e.target.value as ReviewStatus)} className="mt-2 block w-full rounded border border-slate-300 bg-white p-1.5">{reviewStatuses.map((status) => <option key={status}>{status}</option>)}</select></td></tr>;
            })}</tbody>
          </table></div> : <div className="rounded border border-slate-200 p-5 text-center">No recognition reviews match this status.</div>}
        </Panel>
      )}

      {section === 'analytics' && (
        <Panel title="Response Outcome Analytics" subtitle="Demo counts are temporally associated with the scenario timeline. A post-deployment decline alone does not prove a doctor's causal impact." icon={<BarChart3 className="h-4 w-4 text-gov-saffron" />}>
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-950"><strong>Interpretation caution:</strong> The series below is illustrative. Account for disease severity, changing population, resources, reporting completeness and other interventions; no causal effect is estimated.</div>
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <div className="rounded-md border border-slate-200 p-3"><h3 className="font-bold text-gov-navy">Fictional disease reports before / during / after scenario deployment</h3><div className="h-64">
              <ResponsiveContainer width="100%" height="100%"><LineChart data={districtTrendTimeline}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="period" tick={{ fontSize: 9 }} /><YAxis allowDecimals={false} tick={{ fontSize: 10 }} /><Tooltip /><Legend wrapperStyle={{ fontSize: 10 }} /><Line dataKey="nashik" name="Nashik (demo reports)" stroke="#0B3B60" strokeWidth={2} /><Line dataKey="dhule" name="Dhule (demo reports)" stroke="#D9531E" strokeWidth={2} /><Line dataKey="districtXyz" name="District XYZ (demo reports)" stroke="#137333" strokeWidth={2} /></LineChart></ResponsiveContainer>
            </div><p className="text-[10px] text-slate-500">*Projected illustrative period only. Unit: reported cases per sample period. Dates are in the chart labels.</p></div>
            <div className="rounded-md border border-slate-200 p-3"><h3 className="font-bold text-gov-navy">Other outcome measures</h3><dl className="mt-2 space-y-2">{[['Hospital admission trend', 'Not available in demo records'], ['Recovery / mortality context', 'Not available; no patient-level data shown'], ['Time to initiate response', 'Not recorded'], ['Referral completion', 'Not recorded for this scenario'], ['Staff availability', 'District snapshot only; see Alerts'], ['Response activities', 'Scenario records only; no outcome validation'], ['Data completeness', 'Partial demo data; metrics not comparable']].map(([label, value]) => <div key={label} className="grid grid-cols-1 gap-1 border-t border-slate-100 pt-2 sm:grid-cols-[1fr_1.2fr]"><dt className="font-semibold text-slate-700">{label}</dt><dd className="text-slate-600">{value}</dd></div>)}</dl></div>
          </div>
          <form onSubmit={verifyOutcome} className="rounded-md border border-gov-gray-200 bg-slate-50 p-3">
            <h3 className="flex items-center gap-2 font-bold text-gov-navy"><ClipboardCheck className="h-4 w-4" />Record reviewed outcome (demo audit)</h3>
            <p className="mt-1 text-[10px] text-slate-500">Authorized reviewer documents evidence review; marking reviewed does not validate external sources or imply causation.</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_2fr_auto]">
              <select aria-label="Outcome deployment" value={outcomeDeploymentId} onChange={(e) => setOutcomeDeploymentId(e.target.value)} className="rounded border border-slate-300 bg-white p-2"><option value="">Select deployment</option>{storedState.deployments.map((item) => <option key={item.id} value={item.id}>{item.id} • {item.district}</option>)}</select>
              <input aria-label="Outcome review note" value={outcomeNote} onChange={(e) => setOutcomeNote(e.target.value)} placeholder="Summarize evidence, reporting limits, context, and reviewer conclusion" className="rounded border border-slate-300 p-2" />
              <button type="submit" className="rounded bg-gov-navy px-3 py-2 font-bold text-white">Save review</button>
            </div>
          </form>
          {storedState.outcomes.length > 0 && <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3"><h3 className="font-bold text-emerald-950">Reviewed demo outcomes</h3>{storedState.outcomes.map((item) => <div key={item.deploymentId} className="mt-2 border-t border-emerald-200 pt-2"><strong>{item.deploymentId} • {item.reviewedOn}</strong><div>{item.note}</div><div className="text-[10px]">Reviewed by {item.reviewer}; temporal association only.</div></div>)}</div>}
        </Panel>
      )}

      <footer className="rounded-md border border-slate-200 bg-slate-50 p-3 text-[10px] text-slate-600">
        <div className="flex items-start gap-2"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-gov-navy" /><p>{SMART_RESPONSE_DEMO_DATA_NOTICE} Workflow actions are stored in this browser only. There is no backend deployment service, live surveillance feed, external registration verification, official approval integration, or real-time staffing system.</p></div>
      </footer>
    </div>
  );
};
