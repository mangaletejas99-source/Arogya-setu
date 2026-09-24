import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { MOCK_CITIZEN_RECORD, PatientHealthRecord } from '../../data/mockCitizens';
import { MOCK_APPOINTMENTS } from '../../data/mockAppointments';
import { DEMO_PATIENTS, findPatientById } from '../../data/mockPatients';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertOctagon,
  TestTube,
  Share2,
  Stethoscope,
  Pill,
  Video,
  Search,
  ArrowRight,
  FileText,
  Calendar,
  UserRoundSearch,
  MapPin,
  ShieldAlert,
  Activity
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

interface AIHealthSummaryEntry {
  patientId: string;
  date: string;
  language: 'en' | 'hi' | 'mr';
  complaint: string;
  symptoms: string;
  duration: string;
  riskLevel: string;
  summary: string;
  recommendations: string[];
}

export const DoctorDashboard: React.FC = () => {
  const { user } = useAuth();
  const [patientSearch, setPatientSearch] = useState('PAT-1001');
  const [activePatient, setActivePatient] = useState<PatientHealthRecord>(MOCK_CITIZEN_RECORD);
  const [lookupPatient, setLookupPatient] = useState(() => findPatientById('PAT-1001'));
  const [lookupMessage, setLookupMessage] = useState('');
  const [assistantSummaries, setAssistantSummaries] = useState<AIHealthSummaryEntry[]>([]);

  // Clinical workflow form states
  const [clinicalDiagnosis, setClinicalDiagnosis] = useState('Type-2 Diabetes with Peripheral Neuropathy & Mild HTN');
  const [newMedicine, setNewMedicine] = useState('Tab. Pregabalin 75mg OD');
  const [newLabTest, setNewLabTest] = useState('Lipid Profile (Fasting)');
  const [consultNotes, setConsultNotes] = useState('Patient reviewed for monthly diabetic monitoring. Advised adherence to dietary low-sodium protocols and daily brisk walking.');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem('arogya_setu_ai_health_summary_v1');
      if (!raw) {
        setAssistantSummaries([]);
        return;
      }

      const parsed = JSON.parse(raw) as AIHealthSummaryEntry[];
      setAssistantSummaries(parsed);
    } catch {
      setAssistantSummaries([]);
    }
  }, []);

  const handlePatientLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const match = findPatientById(patientSearch);
    if (!match) {
      setLookupPatient(null);
      setLookupMessage('Patient not found. Try PAT-1001, PAT-1002, or PAT-1003.');
      return;
    }
    setLookupPatient(match);
    setLookupMessage('');
  };

  const handleSaveClinicalEncounter = (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccess('Clinical encounter successfully registered to ABHA Record and e-Prescription issued.');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Clinician Welcome Header */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Medical Officer Workstation
            </span>
            <span className="bg-blue-100 text-gov-navy text-[10px] font-bold px-2 py-0.5 rounded">
              OPD Room 4 • Live
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gov-navy mt-1">
            {user.name}
          </h1>
          <div className="text-xs text-slate-600 mt-0.5">
            {user.designation} • {user.facilityOrLocation}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/doctor/teleconsultation"
            className="bg-gov-saffron hover:bg-[#c24615] text-white px-3.5 py-2 rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Open Tele-OPD Room</span>
          </Link>
          <Link
            to="/doctor/queue"
            className="bg-gov-navy hover:bg-gov-navyLight text-white px-3.5 py-2 rounded text-xs font-bold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Manage OPD Queue</span>
          </Link>
        </div>
      </div>

      {/* Doctor Overview Stat Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 text-xs text-center">
        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Today's Total</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">42</div>
          <div className="text-[9px] text-slate-400">Scheduled OPD</div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-amber-800 uppercase font-semibold">Waiting in Queue</div>
          <div className="text-2xl font-extrabold text-amber-900 mt-0.5">5</div>
          <div className="text-[9px] text-amber-700">In waiting room</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-emerald-800 uppercase font-semibold">Consulted</div>
          <div className="text-2xl font-extrabold text-emerald-900 mt-0.5">37</div>
          <div className="text-[9px] text-emerald-700">Cases completed</div>
        </div>

        <div className="bg-rose-50 border border-rose-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-rose-800 uppercase font-semibold">Emergency Triage</div>
          <div className="text-2xl font-extrabold text-rose-900 mt-0.5">2</div>
          <div className="text-[9px] text-rose-700">Priority red cases</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Pending Labs</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">6</div>
          <div className="text-[9px] text-slate-400">Awaiting reports</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Follow-ups Due</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">11</div>
          <div className="text-[9px] text-slate-400">This week</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Referrals Out</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">4</div>
          <div className="text-[9px] text-slate-400">To Tertiary/Sassoon</div>
        </div>
      </div>

      {actionSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{actionSuccess}</span>
        </div>
      )}

      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border-b border-gov-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2 text-gov-navy font-bold uppercase tracking-wider">
            <UserRoundSearch className="w-4 h-4 text-gov-saffron" />
            Patient Health Record Search
          </div>
          <div className="text-[10px] font-bold text-slate-500">Demo database: {DEMO_PATIENTS.length} active records</div>
        </div>

        <form onSubmit={handlePatientLookup} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={patientSearch}
              onChange={(e) => setPatientSearch(e.target.value)}
              placeholder="Patient ID: PAT-1001"
              className="w-full pl-9 pr-3 py-2.5 border border-gov-gray-300 rounded-lg text-sm text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-navy/20"
            />
          </div>
          <button
            type="submit"
            className="bg-gov-navy text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-gov-navyLight transition-colors"
          >
            Search Record
          </button>
        </form>

        {lookupMessage && (
          <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 text-amber-800 text-xs px-3 py-2">
            {lookupMessage}
          </div>
        )}

        {lookupPatient && (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-slate-50 border border-gov-gray-200 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Patient</div>
              <div className="text-sm font-bold text-gov-navy mt-1">{lookupPatient.name}</div>
              <div className="text-[11px] text-slate-600 mt-1">ID: {lookupPatient.patientId} • {lookupPatient.age} yrs • {lookupPatient.gender}</div>
            </div>
            <div className="bg-slate-50 border border-gov-gray-200 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Current Conditions</div>
              <div className="text-[11px] text-slate-700 mt-1">{lookupPatient.currentConditions.join(', ')}</div>
            </div>
            <div className="bg-slate-50 border border-gov-gray-200 rounded-lg p-3">
              <div className="text-[10px] uppercase text-slate-500 font-bold">Emergency Flag</div>
              <div className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${lookupPatient.emergencyFlag ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {lookupPatient.emergencyFlag ? 'Priority response required' : 'Routine review'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2 mb-3">
          <div className="flex items-center gap-2 text-gov-navy font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-gov-saffron" />
            AI Health Assistant Summary
          </div>
          <span className="bg-blue-100 text-gov-navy text-[10px] font-bold px-2 py-1 rounded">{assistantSummaries.length} saved</span>
        </div>

        {assistantSummaries.length === 0 ? (
          <div className="text-slate-500 italic">No AI health summaries yet. Ask the citizen to generate one from the assistant.</div>
        ) : (
          <div className="space-y-3">
            {assistantSummaries.slice(0, 3).map((summary, index) => (
              <div key={`${summary.patientId}-${index}`} className="rounded border border-gov-gray-200 bg-slate-50 p-3 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-gov-navy">Patient complaint: {summary.complaint}</div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${summary.riskLevel === 'HIGH' ? 'bg-rose-100 text-rose-800' : summary.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {summary.riskLevel}
                  </span>
                </div>
                <div className="text-slate-600">Symptoms: {summary.symptoms}</div>
                <div className="text-slate-600">Duration: {summary.duration}</div>
                <div className="text-slate-600">Generated summary: {summary.summary}</div>
                <div className="text-slate-500 text-[10px]">Date: {new Date(summary.date).toLocaleString()}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Clinical Workstation Split: Active Patient in Room + Clinical Action Pad */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active Patient EHR & Vitals Summary (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4 text-xs">
          <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="font-bold text-gov-navy text-sm uppercase">
                Active Patient (Token #{MOCK_APPOINTMENTS[0].tokenNumber})
              </h2>
            </div>
            <StatusBadge status="Under Consultation" size="sm" />
          </div>

          <div className="bg-slate-50 p-3 rounded border border-slate-200 space-y-1">
            <div className="text-sm font-bold text-gov-navy">{activePatient.name}</div>
            <div className="text-slate-600">
              Age: <strong>{activePatient.age} Yrs ({activePatient.gender})</strong> • Blood: <strong className="text-rose-700">{activePatient.bloodGroup}</strong>
            </div>
            <div className="text-slate-500 font-mono text-[11px]">ABHA: {activePatient.abhaId}</div>
          </div>

          {/* Vitals summary */}
          <div className="space-y-1.5">
            <div className="font-bold text-slate-700 text-[11px] uppercase">Recorded Vitals Today:</div>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-100 p-2 rounded">
                <span className="text-slate-500">BP:</span> <strong>{activePatient.vitals.bp}</strong>
              </div>
              <div className="bg-slate-100 p-2 rounded">
                <span className="text-slate-500">Pulse:</span> <strong>{activePatient.vitals.pulse}</strong>
              </div>
              <div className="bg-slate-100 p-2 rounded">
                <span className="text-slate-500">Glucose (F):</span> <strong>{activePatient.vitals.bloodSugarFasting}</strong>
              </div>
              <div className="bg-slate-100 p-2 rounded">
                <span className="text-slate-500">SpO2:</span> <strong>{activePatient.vitals.spo2}</strong>
              </div>
            </div>
          </div>

          {/* Allergies Alert */}
          <div className="bg-rose-50 border border-rose-200 p-2.5 rounded">
            <div className="font-bold text-gov-emergency text-[11px] uppercase">Drug Allergies:</div>
            <div className="text-rose-900 font-semibold mt-0.5">
              ⚠ {activePatient.allergies.join(', ')}
            </div>
          </div>

          <Link
            to="/citizen/records"
            className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-gov-navy rounded font-bold text-center block transition-colors border border-slate-300"
          >
            Open Full Longitudinal Health Journey (4 Visits)
          </Link>
        </div>

        {/* Right: Clinical Action Workspace (Prescribe, Diagnose, Order Tests, Refer) (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs space-y-4">
          <h2 className="text-sm font-bold text-gov-navy border-b border-gov-gray-200 pb-2 uppercase tracking-wider">
            Clinical Consultation & Prescription Pad
          </h2>

          <form onSubmit={handleSaveClinicalEncounter} className="space-y-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Clinical Diagnosis / Findings *
              </label>
              <input
                type="text"
                required
                value={clinicalDiagnosis}
                onChange={(e) => setClinicalDiagnosis(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded font-medium focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Add Prescription Medication
                </label>
                <input
                  type="text"
                  value={newMedicine}
                  onChange={(e) => setNewMedicine(e.target.value)}
                  placeholder="e.g. Tab. Metformin 500mg BD"
                  className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Order Diagnostic Lab Investigation
                </label>
                <input
                  type="text"
                  value={newLabTest}
                  onChange={(e) => setNewLabTest(e.target.value)}
                  placeholder="e.g. HbA1c, Serum Creatinine"
                  className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Clinician Consultation & Lifestyle Notes
              </label>
              <textarea
                rows={4}
                value={consultNotes}
                onChange={(e) => setConsultNotes(e.target.value)}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none leading-relaxed"
              />
            </div>

            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Link
                  to="/doctor/referrals"
                  className="border border-gov-navy text-gov-navy hover:bg-slate-50 px-3 py-2 rounded font-bold text-xs flex items-center gap-1"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Refer to Tertiary Hospital</span>
                </Link>
              </div>

              <button
                type="submit"
                className="bg-gov-navy text-white px-5 py-2 rounded font-bold hover:bg-gov-navyLight transition-colors flex items-center gap-1.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Save Consultation & Call Next Token</span>
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};
