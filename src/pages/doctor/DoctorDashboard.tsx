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
  Activity,
  Droplets,
  PhoneCall,
  Filter,
  ShieldCheck,
  Siren,
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';
import { Modal } from '../../components/common/Modal';
import {
  BLOOD_GROUP_OPTIONS,
  URGENCY_OPTIONS,
  createBloodRequest,
  getBloodRequestHistory,
  getNearbyBloodBanks,
  type BloodBank,
  type BloodGroup,
  type UrgencyLevel,
} from '../../services/bloodBankService';

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

  const [bloodForm, setBloodForm] = useState({
    patientName: 'Aarav Patil',
    patientId: 'PAT-1001',
    bloodGroup: 'O+' as BloodGroup,
    requiredUnits: 2,
    urgency: 'Critical — Immediate' as UrgencyLevel,
    hospital: 'Nashik District Hospital',
    location: 'Nashik',
  });
  const [bloodSort, setBloodSort] = useState<'nearest' | 'most-units' | 'recently-updated'>('nearest');
  const [bloodFilters, setBloodFilters] = useState({
    openNow: false,
    emergencyOnly: false,
    maxDistanceKm: 10,
  });
  const [bloodResults, setBloodResults] = useState<BloodBank[]>([]);
  const [bloodMessage, setBloodMessage] = useState('Demo availability — connect to an authorized blood-bank API for real-time availability.');
  const [requestModalBank, setRequestModalBank] = useState<BloodBank | null>(null);
  const [bloodRequestHistory, setBloodRequestHistory] = useState(() => getBloodRequestHistory());
  const [requestSuccess, setRequestSuccess] = useState<string | null>(null);
  const [locationNotice, setLocationNotice] = useState('Using Maharashtra / Nashik demo blood-bank data for prototype mode.');

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

  useEffect(() => {
    setBloodForm((current) => ({
      ...current,
      patientName: activePatient.name,
      patientId: activePatient.id,
      hospital: current.hospital || 'Nashik District Hospital',
    }));
  }, [activePatient]);

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
    setBloodForm((current) => ({
      ...current,
      patientName: match.name,
      patientId: match.patientId,
    }));
  };

  const handleSaveClinicalEncounter = (e: React.FormEvent) => {
    e.preventDefault();
    setActionSuccess('Clinical encounter successfully registered to ABHA Record and e-Prescription issued.');
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationNotice('Geolocation is unavailable in this browser. Manual district selection is being used.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        setBloodForm((current) => ({ ...current, location: 'Nashik' }));
        setLocationNotice('Current device location detected. Showing nearest Nashik demo blood-bank availability for prototype mode.');
      },
      () => {
        setBloodForm((current) => ({ ...current, location: 'Nashik' }));
        setLocationNotice('Location permission denied. Manual district selection is being used for demo blood-bank availability.');
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 }
    );
  };

  const handleBloodLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const results = getNearbyBloodBanks({
      bloodGroup: bloodForm.bloodGroup,
      location: bloodForm.location,
      requiredUnits: bloodForm.requiredUnits,
      openNow: bloodFilters.openNow,
      emergencyOnly: bloodFilters.emergencyOnly,
      distanceLimitKm: bloodFilters.maxDistanceKm,
      sortBy: bloodSort,
    });

    setBloodResults(results);
    if (results.length === 0) {
      setBloodMessage('No compatible nearby blood banks match the selected filters. Try a broader distance or alternate blood group.');
      return;
    }

    setBloodMessage('Demo availability — connect to an authorized blood-bank API for real-time availability.');
  };

  const handleRequestBlood = (bank: BloodBank) => {
    setRequestModalBank(bank);
  };

  const handleConfirmRequest = () => {
    if (!requestModalBank) return;

    const request = createBloodRequest({
      patientId: bloodForm.patientId,
      patientName: bloodForm.patientName,
      bloodGroup: bloodForm.bloodGroup,
      unitsRequired: bloodForm.requiredUnits,
      hospital: bloodForm.hospital,
      bloodBank: requestModalBank.name,
      urgency: bloodForm.urgency,
    });

    setBloodRequestHistory(getBloodRequestHistory());
    setRequestSuccess(`Blood request created successfully. Request ID: ${request.id} • Request Status: Pending Confirmation`);
    setRequestModalBank(null);
    setTimeout(() => setRequestSuccess(null), 5000);
  };

  return (
    <div className="space-y-6">
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

      {requestSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-3 rounded text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{requestSuccess}</span>
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
        <div className="mb-4 flex items-center justify-between gap-3 border-b border-gov-gray-200 pb-3">
          <div className="flex items-center gap-2 text-gov-navy font-bold uppercase tracking-wider">
            <Droplets className="w-4 h-4 text-rose-600" />
            Emergency Blood Availability
          </div>
          <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-1 rounded">Prototype workflow</span>
        </div>

        <p className="text-sm text-slate-600 max-w-3xl">
          Find compatible blood units available near the patient and initiate a limited demo blood request workflow for hospital staff.
        </p>

        {bloodForm.urgency === 'Critical — Immediate' && (
          <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-800">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]">
              <Siren className="w-4 h-4" />
              CRITICAL BLOOD REQUIREMENT
            </div>
            <div className="mt-1 text-sm font-medium">Immediate blood availability search initiated.</div>
          </div>
        )}

        <form onSubmit={handleBloodLookup} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
              <input
                type="text"
                value={bloodForm.patientName}
                onChange={(e) => setBloodForm((current) => ({ ...current, patientName: e.target.value }))}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient ID</label>
              <input
                type="text"
                value={bloodForm.patientId}
                onChange={(e) => setBloodForm((current) => ({ ...current, patientId: e.target.value }))}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodForm.bloodGroup}
                onChange={(e) => setBloodForm((current) => ({ ...current, bloodGroup: e.target.value as BloodGroup }))}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                {BLOOD_GROUP_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Required Units</label>
              <input
                type="number"
                min={1}
                max={10}
                value={bloodForm.requiredUnits}
                onChange={(e) => setBloodForm((current) => ({ ...current, requiredUnits: Number(e.target.value) || 1 }))}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Urgency</label>
              <select
                value={bloodForm.urgency}
                onChange={(e) => setBloodForm((current) => ({ ...current, urgency: e.target.value as UrgencyLevel }))}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                {URGENCY_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Hospital / Facility</label>
              <input
                type="text"
                value={bloodForm.hospital}
                onChange={(e) => setBloodForm((current) => ({ ...current, hospital: e.target.value }))}
                className="w-full p-2 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Location</label>
              <select
                value={bloodForm.location}
                onChange={(e) => setBloodForm((current) => ({ ...current, location: e.target.value }))}
                className="w-full p-2 border border-gov-gray-300 rounded bg-white focus:ring-1 focus:ring-gov-navy focus:outline-none"
              >
                <option value="Nashik">Nashik</option>
                <option value="Dhule">Dhule</option>
                <option value="Jalgaon">Jalgaon</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="w-full border border-gov-gray-300 bg-slate-50 hover:bg-slate-100 text-gov-navy rounded px-3 py-2 font-bold text-xs"
              >
                Use My Location
              </button>
            </div>
          </div>

          <div className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-[11px] text-sky-800">
            {locationNotice}
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              <span className="font-semibold text-slate-600 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Filters:</span>
              <label className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1">
                <input type="checkbox" checked={bloodFilters.openNow} onChange={(e) => setBloodFilters((current) => ({ ...current, openNow: e.target.checked }))} /> Open Now
              </label>
              <label className="inline-flex items-center gap-1 rounded border border-slate-200 bg-slate-50 px-2 py-1">
                <input type="checkbox" checked={bloodFilters.emergencyOnly} onChange={(e) => setBloodFilters((current) => ({ ...current, emergencyOnly: e.target.checked }))} /> Emergency Support
              </label>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-[11px] font-semibold text-slate-600">Distance</label>
              <select
                value={bloodFilters.maxDistanceKm}
                onChange={(e) => setBloodFilters((current) => ({ ...current, maxDistanceKm: Number(e.target.value) }))}
                className="border border-gov-gray-300 rounded p-1.5 bg-white"
              >
                <option value={5}>Up to 5 km</option>
                <option value={10}>Up to 10 km</option>
                <option value={20}>Up to 20 km</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-600">
              <span>Sort:</span>
              <select
                value={bloodSort}
                onChange={(e) => setBloodSort(e.target.value as 'nearest' | 'most-units' | 'recently-updated')}
                className="border border-gov-gray-300 rounded p-1.5 bg-white"
              >
                <option value="nearest">Nearest</option>
                <option value="most-units">Most Units Available</option>
                <option value="recently-updated">Recently Updated</option>
              </select>
            </div>

            <button
              type="submit"
              className="bg-gov-navy text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-gov-navyLight transition-colors flex items-center justify-center gap-2"
            >
              <Droplets className="w-4 h-4 text-rose-200" />
              Find Nearby Blood
            </button>
          </div>
        </form>

        <div className="mt-3 rounded border border-amber-200 bg-amber-50 px-3 py-2 text-[11px] text-amber-900">
          Blood compatibility and transfusion decisions must always be verified by qualified medical professionals and the treating blood bank.
        </div>

        {bloodMessage && (
          <div className="mt-4 rounded border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] text-slate-700">
            {bloodMessage}
          </div>
        )}

        {bloodResults.length > 0 && (
          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between gap-2 border-b border-gov-gray-200 pb-2">
              <div className="font-bold text-gov-navy uppercase tracking-wider text-[11px]">Nearby Blood Banks</div>
              <div className="text-[10px] text-slate-500">Compatible group: {bloodForm.bloodGroup}</div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {bloodResults.map((bank) => (
                <div key={bank.id} className="rounded-xl border border-gov-gray-200 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-base font-bold text-gov-navy">{bank.name}</div>
                      <div className="mt-1 flex items-center gap-1 text-[11px] text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-gov-saffron" />
                        <span>{bank.address}</span>
                      </div>
                    </div>
                    <div className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${bank.open ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'}`}>
                      {bank.open ? 'Open' : 'Closed'}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                    <div className="rounded bg-slate-50 p-2 border border-slate-200">
                      <div className="text-slate-500">Distance</div>
                      <div className="font-bold text-gov-navy">{bank.distanceKm.toFixed(1)} km</div>
                    </div>
                    <div className="rounded bg-slate-50 p-2 border border-slate-200">
                      <div className="text-slate-500">Blood Group</div>
                      <div className="font-bold text-gov-navy">{bank.bloodGroup}</div>
                    </div>
                    <div className="rounded bg-slate-50 p-2 border border-slate-200">
                      <div className="text-slate-500">Available</div>
                      <div className="font-bold text-gov-navy">{bank.availableUnits} Units</div>
                    </div>
                    <div className="rounded bg-slate-50 p-2 border border-slate-200">
                      <div className="text-slate-500">Updated</div>
                      <div className="font-bold text-gov-navy">{bank.lastUpdatedMinutesAgo} mins ago</div>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-600">
                    <div className="flex items-center gap-1"><PhoneCall className="w-3.5 h-3.5 text-gov-green" />{bank.phone}</div>
                    <div className={`rounded-full px-2 py-0.5 font-bold ${bank.emergencySupport ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-700'}`}>
                      {bank.emergencySupport ? 'Emergency Support' : 'Routine Support'}
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <a
                      href={`tel:${bank.phone}`}
                      className="flex-1 min-w-[120px] bg-gov-navy text-white px-3 py-2 rounded text-[10px] font-bold uppercase tracking-[0.12em] text-center"
                    >
                      Call Now
                    </a>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(bank.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 min-w-[120px] border border-gov-gray-300 bg-white text-gov-navy px-3 py-2 rounded text-[10px] font-bold uppercase tracking-[0.12em] text-center"
                    >
                      Get Directions
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRequestBlood(bank)}
                      className="flex-1 min-w-[120px] bg-gov-saffron text-white px-3 py-2 rounded text-[10px] font-bold uppercase tracking-[0.12em]"
                    >
                      Request Blood
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 rounded border border-slate-200 bg-slate-50 p-3 text-[11px] text-slate-600">
          <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-gov-navy">
            <ShieldCheck className="w-4 h-4 text-gov-saffron" />
            Blood Compatibility Summary
          </div>
          <div className="mt-2">
            {bloodForm.bloodGroup} can receive compatible units from: {getNearbyBloodBanks({ bloodGroup: bloodForm.bloodGroup, distanceLimitKm: 20, location: 'Nashik', requiredUnits: 1, sortBy: 'nearest' }).slice(0, 3).map((bank) => bank.bloodGroup).join(', ') || bloodForm.bloodGroup}
          </div>
        </div>
      </div>

      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs text-xs">
        <div className="flex items-center justify-between gap-2 border-b border-gov-gray-200 pb-2 mb-3">
          <div className="flex items-center gap-2 text-gov-navy font-bold uppercase tracking-wider">
            <FileText className="w-4 h-4 text-gov-saffron" />
            Recent Blood Requests
          </div>
          <span className="bg-blue-100 text-gov-navy text-[10px] font-bold px-2 py-1 rounded">{bloodRequestHistory.length} requests</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-slate-200 text-slate-600">
                <th className="pb-2 pr-3 font-bold uppercase">Request ID</th>
                <th className="pb-2 pr-3 font-bold uppercase">Patient</th>
                <th className="pb-2 pr-3 font-bold uppercase">Blood Group</th>
                <th className="pb-2 pr-3 font-bold uppercase">Units</th>
                <th className="pb-2 pr-3 font-bold uppercase">Blood Bank</th>
                <th className="pb-2 pr-3 font-bold uppercase">Requested At</th>
                <th className="pb-2 pr-3 font-bold uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {bloodRequestHistory.map((request) => (
                <tr key={request.id} className="border-b border-slate-100 align-top">
                  <td className="py-2 pr-3 font-semibold text-gov-navy">{request.id}</td>
                  <td className="py-2 pr-3">{request.patientName}</td>
                  <td className="py-2 pr-3">{request.bloodGroup}</td>
                  <td className="py-2 pr-3">{request.unitsRequired}</td>
                  <td className="py-2 pr-3">{request.bloodBank}</td>
                  <td className="py-2 pr-3">{new Date(request.requestedAt).toLocaleString()}</td>
                  <td className="py-2 pr-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 font-bold ${request.status === 'Pending' ? 'bg-amber-100 text-amber-800' : request.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : request.status === 'Fulfilled' ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'}`}>
                      {request.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
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

      {requestModalBank && (
        <Modal
          isOpen={true}
          onClose={() => setRequestModalBank(null)}
          title="Confirm Blood Request"
          subtitle="Prototype workflow — this does not send a real live blood-bank request"
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs text-slate-700">
            <div className="rounded border border-slate-200 bg-slate-50 p-3 space-y-2">
              <div className="font-bold text-gov-navy uppercase tracking-wider">Request Summary</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div><span className="font-semibold">Patient ID:</span> {bloodForm.patientId}</div>
                <div><span className="font-semibold">Blood Group:</span> {bloodForm.bloodGroup}</div>
                <div><span className="font-semibold">Units Required:</span> {bloodForm.requiredUnits}</div>
                <div><span className="font-semibold">Hospital:</span> {bloodForm.hospital}</div>
                <div><span className="font-semibold">Blood Bank:</span> {requestModalBank.name}</div>
                <div><span className="font-semibold">Urgency:</span> {bloodForm.urgency}</div>
              </div>
            </div>

            <div className="rounded border border-amber-200 bg-amber-50 p-3 text-amber-900">
              Blood compatibility and transfusion decisions must always be verified by qualified medical professionals and the treating blood bank.
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setRequestModalBank(null)}
                className="border border-gov-gray-300 text-gov-navy px-4 py-2 rounded font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmRequest}
                className="bg-gov-navy text-white px-4 py-2 rounded font-bold hover:bg-gov-navyLight"
              >
                Confirm Request
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
