export type AlertPriority = 'Normal Monitoring' | 'Watch' | 'High Alert' | 'Critical Review';
export type ResponseStatus = 'Normal Monitoring' | 'Watch' | 'High Alert' | 'Critical Review' | 'Response in Progress' | 'Under Control — Pending Verification';
export type WorkflowStatus = 'Draft' | 'Pending Approval' | 'Approved' | 'Rejected' | 'Assigned' | 'In Progress' | 'Completed' | 'Cancelled';
export type ReviewStatus = 'Evidence Pending' | 'Under Verification' | 'Verified' | 'Recognition Recommended' | 'Promotion Review Requested' | 'Decision Pending' | 'Approved' | 'Not Approved';

export interface DistrictAlert {
  district: string;
  disease: string;
  newCases: number;
  activeCases: number | null;
  changePercent: number;
  occupancyPercent: number | null;
  availableDoctors: number;
  requiredPersonnel: number;
  lastUpdated: string;
  priority: AlertPriority;
  responseStatus: ResponseStatus;
  series: number[];
  facilities: string[];
}

export interface DemoDoctor {
  id: string;
  name: string;
  qualifications: string;
  registrationStatus: string;
  specialty: string;
  expertise: string[];
  hospital: string;
  district: string;
  availability: 'Available' | 'Limited availability' | 'Unavailable';
  languages: string[];
  assignments: string[];
  training: string[];
  workload: string;
  eligible: boolean;
  score: number;
  rankingFactors: {
    experience: number;
    training: number;
    safetyProtocol: number;
    teamwork: number;
    reporting: number;
    availability: number;
  };
  expertiseCategory: string;
  specialtyRank: number;
  evidence: string[];
  period: string;
  reviewStatus: string;
  reviewedOn: string;
  teamworkScore: number;
  reportingScore: number;
  safetyScore: number;
  qualityScore: number;
  awards: string[];
}

export interface DeploymentRecord {
  id: string;
  district: string;
  disease: string;
  doctorId: string;
  origin: string;
  destination: string;
  requestedOn: string;
  startsOn: string;
  endsOn: string;
  approval: WorkflowStatus;
  assignment: WorkflowStatus;
  approvingOfficer: string;
  outcomeStatus: string;
  reason: string;
  rejectionReason?: string;
}

export interface RecognitionRecord {
  id: string;
  doctorId: string;
  achievement: string;
  evidence: string;
  period: string;
  reviewer: string;
  recommendation: string;
  status: ReviewStatus;
  notes: string;
}

export interface AuditEntry {
  at: string;
  actor: string;
  action: string;
  subject: string;
  reason: string;
}

export const SMART_RESPONSE_DEMO_DATA_NOTICE =
  'DEMO DATA ONLY • Fictional scenario records. No live government surveillance, credential verification, official deployment orders, or real doctor performance data are connected.';

export const DEMO_DISEASES = [
  'Viral Fever-X (fictional)',
  'Dengue (illustrative)',
  'Acute Respiratory Illness (illustrative)',
];

export const DEMO_DISTRICT_ALERTS: DistrictAlert[] = [
  {
    district: 'Nashik', disease: 'Viral Fever-X (fictional)', newCases: 42, activeCases: 126,
    changePercent: 38, occupancyPercent: 82, availableDoctors: 8, requiredPersonnel: 14,
    lastUpdated: '2026-10-16 18:00 IST', priority: 'High Alert', responseStatus: 'High Alert',
    series: [12, 18, 19, 26, 31, 42], facilities: ['Nashik District Demo Hospital', 'Trimbak Demo PHC'],
  },
  {
    district: 'Dhule', disease: 'Viral Fever-X (fictional)', newCases: 27, activeCases: 71,
    changePercent: 24, occupancyPercent: 74, availableDoctors: 5, requiredPersonnel: 9,
    lastUpdated: '2026-10-16 17:30 IST', priority: 'Watch', responseStatus: 'Watch',
    series: [8, 12, 14, 18, 22, 27], facilities: ['Dhule Demo Civil Hospital', 'Sakri Demo Rural Hospital'],
  },
  {
    district: 'Pune', disease: 'Dengue (illustrative)', newCases: 18, activeCases: 64,
    changePercent: -8, occupancyPercent: 68, availableDoctors: 24, requiredPersonnel: 12,
    lastUpdated: '2026-10-16 16:00 IST', priority: 'Normal Monitoring', responseStatus: 'Normal Monitoring',
    series: [32, 29, 26, 24, 21, 18], facilities: ['Pune Demo General Hospital'],
  },
  {
    district: 'Nagpur', disease: 'Acute Respiratory Illness (illustrative)', newCases: 31, activeCases: 93,
    changePercent: 12, occupancyPercent: 77, availableDoctors: 11, requiredPersonnel: 13,
    lastUpdated: '2026-10-16 15:00 IST', priority: 'Watch', responseStatus: 'Watch',
    series: [16, 18, 20, 24, 28, 31], facilities: ['Nagpur Demo Medical Centre'],
  },
  {
    district: 'Chhatrapati Sambhajinagar', disease: 'Dengue (illustrative)', newCases: 21, activeCases: 58,
    changePercent: 6, occupancyPercent: 71, availableDoctors: 7, requiredPersonnel: 8,
    lastUpdated: '2026-10-16 14:00 IST', priority: 'Watch', responseStatus: 'Watch',
    series: [13, 14, 16, 18, 19, 21], facilities: ['Sambhajinagar Demo Hospital'],
  },
  {
    district: 'District XYZ (fictional)', disease: 'Viral Fever-X (fictional)', newCases: 3, activeCases: 11,
    changePercent: -72, occupancyPercent: 39, availableDoctors: 7, requiredPersonnel: 4,
    lastUpdated: '2026-10-16 18:30 IST', priority: 'Normal Monitoring', responseStatus: 'Under Control — Pending Verification',
    series: [41, 36, 28, 19, 8, 3], facilities: ['District XYZ Demonstration Hospital'],
  },
];

export const DEMO_DOCTORS: DemoDoctor[] = [
  {
    id: 'DEMO-DOC-XYZ-01', name: 'Dr. Mira Demo', qualifications: 'MBBS, MD (Community Medicine) • fictional',
    registrationStatus: 'Demo placeholder only — not registered or verified against any real authority',
    specialty: 'Infectious Disease Response', expertise: ['Viral Fever-X (fictional)', 'Outbreak surveillance'],
    hospital: 'District XYZ Demonstration Hospital', district: 'District XYZ (fictional)', availability: 'Available',
    languages: ['English', 'Marathi'], assignments: ['Viral Fever-X fictional response — District XYZ (demo)'],
    training: ['DEMO: Outbreak field coordination module'], workload: '4 of 10 demo workload units',
    eligible: true, score: 89, rankingFactors: { experience: 90, training: 85, safetyProtocol: 90, teamwork: 80, reporting: 90, availability: 100 }, expertiseCategory: 'Outbreak Response', specialtyRank: 1,
    evidence: ['Scenario-matched experience record for fictional Viral Fever-X', 'Training evidence record is scenario-only',
      'Protocol adherence audit sample: 9/10 (demo)', 'Team coordination review: 8/10 (demo)',
      'Timely reporting completeness: 90% (demo)', 'Safety review status: no unresolved demo flags'],
    period: '2026 Q3 (fictional evaluation period)', reviewStatus: 'Demo evidence reviewed in scenario only',
    reviewedOn: '2026-10-10', teamworkScore: 8, reportingScore: 9, safetyScore: 9, qualityScore: 9,
    awards: ['DEMO recognition: cross-facility coordination (not an official award)'],
  },
  {
    id: 'DEMO-DOC-NSK-02', name: 'Dr. Aarav Example', qualifications: 'MBBS, DNB (Internal Medicine) • fictional',
    registrationStatus: 'Demo placeholder only — not registered or verified against any real authority',
    specialty: 'Internal Medicine', expertise: ['Viral Fever-X (fictional)', 'Acute respiratory illness'],
    hospital: 'Nashik District Demo Hospital', district: 'Nashik', availability: 'Limited availability',
    languages: ['English', 'Marathi', 'Hindi'], assignments: ['DEMO seasonal fever triage'],
    training: ['DEMO: Clinical protocol refresher'], workload: '8 of 10 demo workload units',
    eligible: false, score: 77, rankingFactors: { experience: 80, training: 80, safetyProtocol: 80, teamwork: 80, reporting: 80, availability: 50 }, expertiseCategory: 'Internal Medicine', specialtyRank: 2,
    evidence: ['Scenario-matched clinical experience (demo)', 'Protocol adherence audit sample: 8/10 (demo)',
      'Team coordination review: 8/10 (demo)', 'Reporting completeness: 8/10 (demo)',
      'Existing facility staffing impact requires review'],
    period: '2026 Q3 (fictional evaluation period)', reviewStatus: 'Demo evidence reviewed in scenario only',
    reviewedOn: '2026-10-10', teamworkScore: 8, reportingScore: 8, safetyScore: 8, qualityScore: 8,
    awards: [],
  },
  {
    id: 'DEMO-DOC-DHU-03', name: 'Dr. Leena Sample', qualifications: 'MBBS, DPH • fictional',
    registrationStatus: 'Demo placeholder only — not registered or verified against any real authority',
    specialty: 'Community Medicine', expertise: ['Viral Fever-X (fictional)', 'Field reporting'],
    hospital: 'Dhule Demo Civil Hospital', district: 'Dhule', availability: 'Available',
    languages: ['Marathi', 'Hindi'], assignments: ['DEMO district surveillance exercise'],
    training: ['DEMO: Field epidemiology orientation'], workload: '6 of 10 demo workload units',
    eligible: true, score: 83, rankingFactors: { experience: 80, training: 80, safetyProtocol: 80, teamwork: 90, reporting: 80, availability: 100 }, expertiseCategory: 'Community Medicine', specialtyRank: 2,
    evidence: ['Relevant fictional-disease exercise (demo)', 'Protocol adherence audit sample: 8/10 (demo)',
      'Team coordination review: 9/10 (demo)', 'Reporting completeness: 8/10 (demo)',
      'Staffing and travel arrangements still require officer review'],
    period: '2026 Q3 (fictional evaluation period)', reviewStatus: 'Demo evidence reviewed in scenario only',
    reviewedOn: '2026-10-09', teamworkScore: 9, reportingScore: 8, safetyScore: 8, qualityScore: 8,
    awards: [],
  },
  {
    id: 'DEMO-DOC-PUN-04', name: 'Dr. Nikhil Placeholder', qualifications: 'MBBS • fictional',
    registrationStatus: 'Demo placeholder only — not registered or verified against any real authority',
    specialty: 'General Medicine', expertise: ['Dengue (illustrative)'],
    hospital: 'Pune Demo General Hospital', district: 'Pune', availability: 'Unavailable',
    languages: ['English', 'Marathi'], assignments: ['DEMO hospital surge support'],
    training: [], workload: '10 of 10 demo workload units',
    eligible: false, score: 57, rankingFactors: { experience: 70, training: 20, safetyProtocol: 75, teamwork: 70, reporting: 70, availability: 0 }, expertiseCategory: 'General Medicine', specialtyRank: 3,
    evidence: ['Illustrative dengue caseload exposure (demo)', 'Unavailable and fully allocated in this scenario',
      'Staffing impact makes the doctor unsuitable for current deployment'],
    period: '2026 Q3 (fictional evaluation period)', reviewStatus: 'Demo evidence reviewed in scenario only',
    reviewedOn: '2026-10-08', teamworkScore: 7, reportingScore: 7, safetyScore: 8, qualityScore: 7,
    awards: [],
  },
];

export const initialDeployments: DeploymentRecord[] = [
  {
    id: 'DEP-DEMO-001', district: 'Nashik', disease: 'Viral Fever-X (fictional)',
    doctorId: 'DEMO-DOC-XYZ-01', origin: 'District XYZ Demonstration Hospital',
    destination: 'Nashik District Demo Hospital', requestedOn: '2026-10-16',
    startsOn: '2026-10-20', endsOn: '2026-10-27', approval: 'Pending Approval',
    assignment: 'Draft', approvingOfficer: 'Awaiting authorized review',
    outcomeStatus: 'Not started', reason: 'Scenario-matched experience; staffing impact and qualifications need human review.',
  },
  {
    id: 'DEP-DEMO-002', district: 'Dhule', disease: 'Viral Fever-X (fictional)',
    doctorId: 'DEMO-DOC-DHU-03', origin: 'Dhule Demo Civil Hospital',
    destination: 'Dhule Demo Civil Hospital', requestedOn: '2026-10-12',
    startsOn: '2026-10-13', endsOn: '2026-10-19', approval: 'Approved',
    assignment: 'In Progress', approvingOfficer: 'Demo Health Administrator',
    outcomeStatus: 'Review pending', reason: 'Fictional district exercise for response workflow demonstration.',
  },
];

export const initialRecognitions: RecognitionRecord[] = [
  {
    id: 'REC-DEMO-001', doctorId: 'DEMO-DOC-XYZ-01',
    achievement: 'Cross-facility response coordination during fictional Viral Fever-X scenario',
    evidence: 'Scenario assignment log and demo team review; no real patient outcomes included.',
    period: '2026 Q3 (fictional evaluation period)', reviewer: 'Demo Review Panel',
    recommendation: 'Recognition Recommended', status: 'Under Verification',
    notes: 'Verify source evidence and apply applicable service rules before any decision.',
  },
  {
    id: 'REC-DEMO-002', doctorId: 'DEMO-DOC-DHU-03',
    achievement: 'Timely reporting in a fictional district surveillance exercise',
    evidence: 'Demo reporting completeness record (8/10).',
    period: '2026 Q3 (fictional evaluation period)', reviewer: 'Demo Review Panel',
    recommendation: 'Recognition review only', status: 'Evidence Pending',
    notes: 'Supporting documentation pending in this scenario.',
  },
];

export const districtTrendTimeline = [
  { period: 'Before • Oct 10', nashik: 19, dhule: 14, districtXyz: 36 },
  { period: 'Before • Oct 12', nashik: 26, dhule: 18, districtXyz: 28 },
  { period: 'During • Oct 14', nashik: 31, dhule: 22, districtXyz: 19 },
  { period: 'During • Oct 16', nashik: 42, dhule: 27, districtXyz: 8 },
  { period: 'After • Oct 18*', nashik: 38, dhule: 24, districtXyz: 3 },
];

export const rankingRubric = [
  { key: 'experience', factor: 'Relevant, scenario-matched clinical experience', weight: 25 },
  { key: 'training', factor: 'Disease-specific training and expertise', weight: 20 },
  { key: 'safetyProtocol', factor: 'Protocol quality and patient-safety evidence', weight: 20 },
  { key: 'teamwork', factor: 'Teamwork and cross-facility coordination', weight: 15 },
  { key: 'reporting', factor: 'Timely reporting and follow-up completeness', weight: 10 },
  { key: 'availability', factor: 'Availability and workload suitability', weight: 10 },
];

export const demoActor = 'Authorized Government Dashboard Demo User';
