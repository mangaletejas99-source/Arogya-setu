import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { MOCK_CITIZEN_RECORD } from '../../data/mockCitizens';
import { MOCK_APPOINTMENTS, calculateQueueMetrics } from '../../data/mockAppointments';
import { DEMO_PATIENTS, getEligibleSchemes } from '../../data/mockPatients';
import {
  Calendar,
  Clock,
  FileText,
  TestTube,
  Pill,
  AlertTriangle,
  ArrowRight,
  Shield,
  Stethoscope,
  Video,
  AlertOctagon,
  Bot,
  Activity,
  CheckCircle2,
  Search,
  Award
} from 'lucide-react';
import { AbhaCard } from '../../components/clinical/AbhaCard';
import { QueueTracker } from '../../components/clinical/QueueTracker';

export const CitizenDashboard: React.FC = () => {
  const { user } = useAuth();
  const { t } = useAccessibility();
  const patient = MOCK_CITIZEN_RECORD;
  const activeAppointment = MOCK_APPOINTMENTS[0];
  const queueMetrics = calculateQueueMetrics(activeAppointment);
  const [patientIdQuery, setPatientIdQuery] = useState('PAT-1001');
  const [schemeLookup, setSchemeLookup] = useState(() => {
    const match = DEMO_PATIENTS.find(p => p.patientId === 'PAT-1001');
    return match ? getEligibleSchemes(match) : [];
  });
  const [schemeError, setSchemeError] = useState('');

  const handleSchemeLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const match = DEMO_PATIENTS.find((p) => p.patientId.toUpperCase() === patientIdQuery.trim().toUpperCase());
    if (!match) {
      setSchemeLookup([]);
      setSchemeError('No patient found. Try PAT-1001, PAT-1002 or PAT-1003.');
      return;
    }
    setSchemeLookup(getEligibleSchemes(match));
    setSchemeError('');
  };

  const eligibleSummary = useMemo(() => {
    const total = schemeLookup.length;
    const eligibleCount = schemeLookup.filter((scheme) => scheme.status === 'Eligible').length;
    return { total, eligibleCount };
  }, [schemeLookup]);

  return (
    <div className="space-y-6">
      {/* Welcome Banner with Health Profile Score & ABHA */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Citizen Digital Health Portal
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              ABDM Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gov-navy mt-1">
            {t.welcome}, {patient.name}
          </h1>
          <div className="text-xs text-slate-600 mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>ABHA ID: <strong className="font-mono text-gov-navy">{patient.abhaId}</strong></span>
            <span>•</span>
            <span>Address: {patient.address}</span>
            <span>•</span>
            <span>Blood Group: <strong className="text-rose-700">{patient.bloodGroup}</strong></span>
          </div>
        </div>

        {/* Profile completion gauge */}
        <div className="bg-slate-50 border border-slate-200 p-3 rounded-lg flex items-center gap-4 shrink-0 text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-500">ABHA Health Profile Score</div>
            <div className="text-lg font-black text-emerald-700">85% Complete</div>
            <div className="text-[10px] text-slate-500">Vitals, Labs & Identity Verified</div>
          </div>
          <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-xs text-gov-navy bg-white">
            85%
          </div>
        </div>
      </div>

      {/* Real-time Queue Alert Banner if token is active */}
      <div className="bg-gradient-to-r from-gov-navy to-gov-navyLight text-white rounded-lg p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-amber-400 text-slate-950 font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-amber-300">
              Live OPD Outpatient Queue Alert
            </div>
            <div className="text-base font-bold">
              Token #{activeAppointment.tokenNumber} — Currently Serving #{activeAppointment.currentServingToken}
            </div>
            <div className="text-xs text-slate-200 mt-0.5">
              {activeAppointment.doctorName} • {activeAppointment.roomNo} ({activeAppointment.facilityName})
            </div>
          </div>
        </div>

        <Link
          to="/citizen/queue"
          className="bg-gov-saffron hover:bg-[#c24615] text-white px-4 py-2 rounded text-xs font-bold transition-colors shrink-0 flex items-center gap-1 self-start sm:self-auto"
        >
          <span>Open Live Queue Tracker</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Overview Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Card 1: Upcoming Appointment */}
        <div className="bg-white border border-gov-gray-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-gov-navy">OPD Appointment</span>
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 py-0.2 rounded">Confirmed</span>
            </div>
            <h3 className="font-bold text-gov-navy text-sm">{activeAppointment.doctorName}</h3>
            <div className="text-xs text-slate-600 mt-1">
              {activeAppointment.specialty} • {activeAppointment.roomNo}
            </div>
            <div className="text-xs text-slate-500 mt-0.5 font-medium">
              Today at {activeAppointment.slotTime}
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-medium">Token: #{activeAppointment.tokenNumber}</span>
            <Link to="/citizen/appointments" className="text-gov-navy font-bold hover:underline">
              View Slip →
            </Link>
          </div>
        </div>

        {/* Card 2: Pending Diagnostic Test */}
        <div className="bg-white border border-gov-gray-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-gov-navy">Diagnostic Investigation</span>
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.2 rounded">Scheduled</span>
            </div>
            <h3 className="font-bold text-gov-navy text-sm">Lipid Profile (12h Fasting)</h3>
            <div className="text-xs text-slate-600 mt-1">
              Civil Hospital Pathology Lab, Nashik
            </div>
            <div className="text-xs text-amber-800 font-medium mt-0.5">
              Scheduled tomorrow, 08:00 AM
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">1 Report Ready (CBC)</span>
            <Link to="/citizen/diagnostics" className="text-gov-navy font-bold hover:underline">
              View Labs →
            </Link>
          </div>
        </div>

        {/* Card 3: Active Medicines Refill */}
        <div className="bg-white border border-gov-gray-200 rounded-lg p-4 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-semibold uppercase text-[10px] text-gov-navy">Essential Prescriptions</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">Active</span>
            </div>
            <h3 className="font-bold text-gov-navy text-sm">Tab. Metformin 500mg & Amlodipine 5mg</h3>
            <div className="text-xs text-slate-600 mt-1">
              Refill available at PHC Trimbak Pharmacy
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              30-Day NCD Supply Dispensed
            </div>
          </div>
          <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-emerald-700 font-semibold text-[11px]">In Stock Nearby</span>
            <Link to="/citizen/medicines" className="text-gov-navy font-bold hover:underline">
              Check Pharmacy →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Access Action Hub */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5">
        <div className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-3">
          Citizen Quick Health Actions
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-xs text-center">
          <Link
            to="/citizen/triage"
            className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-gov-navy hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <Stethoscope className="w-5 h-5 text-gov-navy group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-navy">Digital Triage</span>
          </Link>

          <Link
            to="/citizen/teleconsultation"
            className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-gov-navy hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <Video className="w-5 h-5 text-gov-navy group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-navy">e-Sanjeevani</span>
          </Link>

          <Link
            to="/citizen/appointments"
            className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-gov-navy hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <Calendar className="w-5 h-5 text-gov-navy group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-navy">Book OPD</span>
          </Link>

          <Link
            to="/citizen/referrals"
            className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-gov-navy hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <Activity className="w-5 h-5 text-gov-navy group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-navy">Referrals</span>
          </Link>

          <Link
            to="/citizen/assistant"
            className="p-3 bg-slate-50 border border-slate-200 rounded hover:border-gov-navy hover:bg-slate-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <Bot className="w-5 h-5 text-gov-navy group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-navy">AI Assistant</span>
          </Link>

          <Link
            to="/citizen/emergency"
            className="p-3 bg-rose-50 border border-rose-200 rounded hover:border-gov-emergency hover:bg-rose-100 transition-colors flex flex-col items-center justify-center gap-1.5 group"
          >
            <AlertOctagon className="w-5 h-5 text-gov-emergency group-hover:scale-110 transition-transform" />
            <span className="font-bold text-gov-emergency">Emergency 108</span>
          </Link>
        </div>
      </div>

      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-gov-gray-200 pb-3 mb-4">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-gov-saffron">
              Health Scheme Eligibility Search
            </div>
            <h2 className="text-lg font-bold text-gov-navy mt-1">
              Patient ID Based Scheme Check
            </h2>
          </div>
          <div className="text-xs text-gov-navy font-semibold bg-slate-100 px-2.5 py-1.5 rounded-full">
            {eligibleSummary.eligibleCount} eligible / {eligibleSummary.total} checked
          </div>
        </div>

        <form onSubmit={handleSchemeLookup} className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={patientIdQuery}
              onChange={(e) => setPatientIdQuery(e.target.value)}
              placeholder="Enter Patient ID (PAT-1001)"
              className="w-full pl-9 pr-3 py-2.5 border border-gov-gray-300 rounded-lg text-sm text-gov-navy focus:outline-none focus:ring-2 focus:ring-gov-navy/20"
            />
          </div>
          <button
            type="submit"
            className="bg-gov-navy text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-gov-navyLight transition-colors"
          >
            Check Schemes
          </button>
        </form>

        {schemeError && (
          <div className="mt-3 rounded-md border border-rose-200 bg-rose-50 text-rose-700 text-xs px-3 py-2">
            {schemeError}
          </div>
        )}

        {schemeLookup.length > 0 && (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {schemeLookup.map((scheme) => (
              <div key={scheme.schemeId} className="rounded-lg border border-gov-gray-200 bg-slate-50 p-4">
                <div className="flex items-center justify-between gap-2">
                  <div className="font-bold text-gov-navy text-sm">{scheme.name}</div>
                  <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    scheme.status === 'Eligible' ? 'bg-emerald-100 text-emerald-800' :
                    scheme.status === 'Potentially Eligible' ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'}
                  `}>
                    {scheme.status}
                  </span>
                </div>
                <div className="mt-2 text-[11px] text-slate-600">{scheme.eligibilityReason}</div>
                <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-gov-navy">
                  <Award className="w-3.5 h-3.5" />
                  {scheme.applicationStatus}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Embedded ABHA Card Component */}
      <AbhaCard record={patient} />
    </div>
  );
};
