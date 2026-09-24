import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { useAccessibility } from '../../context/AccessibilityContext';
import {
  Search,
  Building2,
  UserCheck,
  Calendar,
  Video,
  FileText,
  Stethoscope,
  Pill,
  TestTube,
  AlertOctagon,
  Share2,
  Award,
  Bot,
  Shield,
  Activity,
  Heart,
  Baby,
  Syringe,
  Brain,
  ShieldCheck,
  PhoneCall,
  Clock,
  ArrowRight,
  Download,
  CheckCircle2,
  Users,
  ExternalLink,
  MapPin,
  Siren
} from 'lucide-react';
import { MOCK_FACILITIES } from '../../data/mockFacilities';
import { MOCK_NOTICES } from '../../data/mockNotices';
import { MOCK_SCHEMES } from '../../data/mockSchemes';
import { DEMO_PATIENTS, findPatientById } from '../../data/mockPatients';

export const HomePage: React.FC = () => {
  const { t } = useAccessibility();
  const navigate = useNavigate();
  const [searchCategory, setSearchCategory] = useState<'all' | 'facility' | 'doctor' | 'medicine' | 'test' | 'scheme'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [emergencyPatientId, setEmergencyPatientId] = useState('PAT-1001');
  const [emergencyResult, setEmergencyResult] = useState(() => findPatientById('PAT-1001'));
  const [emergencyError, setEmergencyError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKeyword.trim()) {
      navigate('/services');
      return;
    }
    if (searchCategory === 'facility') navigate(`/facilities?q=${encodeURIComponent(searchKeyword)}`);
    else if (searchCategory === 'medicine') navigate(`/citizen/medicines?q=${encodeURIComponent(searchKeyword)}`);
    else if (searchCategory === 'test') navigate(`/citizen/diagnostics?q=${encodeURIComponent(searchKeyword)}`);
    else if (searchCategory === 'scheme') navigate(`/schemes?q=${encodeURIComponent(searchKeyword)}`);
    else navigate(`/services?q=${encodeURIComponent(searchKeyword)}`);
  };

  const handleEmergencyLookup = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = findPatientById(emergencyPatientId);
    if (!patient) {
      setEmergencyError('No patient match found for this ID. Try PAT-1001, PAT-1002, or PAT-1003.');
      setEmergencyResult(null);
      return;
    }
    setEmergencyResult(patient);
    setEmergencyError('');
  };

  const citizenServiceTiles = [
    { title: t.findFacility, desc: 'Locate 1,840+ Sub-Centres, PHCs, & District Civil Hospitals', icon: Building2, path: '/facilities', color: 'text-gov-navy' },
    { title: t.findDoctor, desc: 'Find specialist physicians across Medicine, Ob-Gyn, Surgery', icon: UserCheck, path: '/citizen/appointments', color: 'text-gov-navy' },
    { title: t.bookAppointment, desc: 'Instant outpatient registration with digital token generation', icon: Calendar, path: '/citizen/appointments', color: 'text-gov-navy' },
    { title: t.teleconsultation, desc: 'Rural patient & ASHA connected to specialist hospital doctors', icon: Video, path: '/citizen/teleconsultation', color: 'text-gov-navy' },
    { title: t.healthRecords, desc: 'Longitudinal ABHA medical records, labs & prescriptions', icon: FileText, path: '/citizen/records', color: 'text-gov-navy' },
    { title: t.digitalTriage, desc: 'Symptom decision-support & emergency facility escalation', icon: Stethoscope, path: '/citizen/triage', color: 'text-gov-navy' },
    { title: t.medicineAvailability, desc: 'Real-time essential drug stock search across PHC pharmacies', icon: Pill, path: '/citizen/medicines', color: 'text-gov-navy' },
    { title: t.diagnosticServices, desc: 'Book laboratory pathology & view verified test reports', icon: TestTube, path: '/citizen/diagnostics', color: 'text-gov-navy' },
    { title: t.emergencyHelp, desc: '24x7 108 Ambulance dispatch & trauma hospital locator', icon: AlertOctagon, path: '/citizen/emergency', color: 'text-gov-emergency', alert: true },
    { title: t.referralTracking, desc: 'Sub-Centre → PHC → Rural → District Hospital tracking', icon: Share2, path: '/citizen/referrals', color: 'text-gov-navy' },
    { title: t.healthSchemes, desc: 'PM-JAY, MJPJAY, PMSMA, and Vaya Vandana welfare benefits', icon: Award, path: '/schemes', color: 'text-gov-navy' },
    { title: t.aiAssistant, desc: 'Arogya Saathi multilingual symptom guide & doctor summary', icon: Bot, path: '/citizen/assistant', color: 'text-gov-navy' },
  ];

  const digitalHealthCards = [
    { title: 'My Health Records (PHR)', count: '4 Clinical Visits', desc: 'Secure ABDM compliant health records accessible across all facilities.', path: '/citizen/records' },
    { title: 'Active Prescriptions', count: '3 Medicines Active', desc: 'Metformin, Amlodipine, Paracetamol refills tracked at PHC Trimbak.', path: '/citizen/records' },
    { title: 'Pathology & Lab Reports', count: '1 Report Ready', desc: 'Complete Blood Count (CBC) & HbA1c chemistry verified.', path: '/citizen/diagnostics' },
    { title: 'Active OPD Appointments', count: 'Token #18 Active', desc: 'Dr. Ananya Patil, MD Medicine at District Hospital Nashik.', path: '/citizen/queue' },
    { title: 'Referral Pipeline', count: 'Step 3: Reached', desc: 'PHC Trimbak to District Hospital Nashik Diabetology OPD.', path: '/citizen/referrals' },
    { title: 'National Vaccination', count: 'Up to Date', desc: 'Adult COVID-19 booster & tetanus toxoid verified on registry.', path: '/citizen/records' },
    { title: 'High-Risk Follow-up', count: 'Next: 20 Sep', desc: 'Monthly hypertension and diabetic foot check schedule.', path: '/citizen/records' },
    { title: 'Verified ABHA Health ID', count: '91-4829-1048-2910', desc: 'Unified Ayushman Bharat health account with QR code access.', path: '/citizen/records' },
  ];

  const healthProgrammes = [
    { title: 'Maternal Health (ANC/PNC)', icon: Heart, desc: 'Free antenatal checkups on 9th of every month, institutional delivery incentives, and high-risk pregnancy monitoring.' },
    { title: 'Child Health & Nutrition', icon: Baby, desc: 'Severe Acute Malnutrition (SAM) screening, Nutrition Rehabilitation Centres (NRC), and infant survival tracking.' },
    { title: 'Universal Immunisation (UIP)', icon: Syringe, desc: 'Life-saving vaccine protection against 12 preventable diseases for infants, young children, and pregnant mothers.' },
    { title: 'Non-Communicable Diseases (NCD)', icon: Activity, desc: 'Population-based screening for hypertension, diabetes, oral, breast, and cervical cancers at Health & Wellness Sub-Centres.' },
    { title: 'National Mental Health (NMHP)', icon: Brain, desc: 'District mental health units, Tele-MANAS helpline (14416) counseling, and psycho-social field support.' },
    { title: 'Preventive Public Health', icon: ShieldCheck, desc: 'Vector-borne disease vector control, monsoon outbreak surveillance, and community water sanitization.' },
    { title: 'Emergency & Trauma Care', icon: PhoneCall, desc: 'State trauma registry, 108 emergency ambulance network, and emergency blood bank availability.' },
    { title: 'Elderly Care (NPPHC)', icon: Users, desc: 'Dedicated geriatric OPDs, assistive aids, home-based palliative care, and Ayushman Vaya Vandana coverage.' },
  ];

  return (
    <div className="space-y-10 bg-slate-50 pb-12">
      <section className="relative overflow-hidden bg-gradient-to-br from-gov-navy via-[#0c3d66] to-[#07243B] text-white shadow-[0_20px_60px_rgba(11,59,96,0.22)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(217,83,30,0.24),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(56,189,248,0.18),_transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-10 lg:py-12">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 text-[10px] md:text-[11px] uppercase tracking-[0.18em] text-slate-200/90">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gov-saffron shadow-[0_0_12px_rgba(217,83,30,0.9)]" />
              National Health Mission • Maharashtra
            </span>
            <span className="text-slate-300">Public Health Service Directory</span>
          </div>

          <div className="grid items-center gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <span className="inline-block rounded-full bg-gov-saffron px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white shadow-lg shadow-orange-500/25">
                Prototype / Demo • Integrated Citizen Care
              </span>

              <div className="space-y-3">
                <h1 className="max-w-2xl text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl lg:text-5xl">
                  {t.serviceSearchTitle}
                </h1>
                <p className="max-w-xl text-sm leading-relaxed text-slate-200 sm:text-base">
                  {t.serviceSearchSub}
                </p>
              </div>

              <form onSubmit={handleSearch} className="max-w-3xl rounded-2xl bg-white p-3 shadow-2xl ring-4 ring-white/10">
                <div className="mb-2 flex flex-wrap items-center justify-center gap-1.5 border-b border-slate-200 pb-2 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-600">
                  {[
                    { id: 'all', label: 'All Services' },
                    { id: 'facility', label: 'Hospitals & PHCs' },
                    { id: 'doctor', label: 'Doctors' },
                    { id: 'medicine', label: 'Medicines' },
                    { id: 'test', label: 'Diagnostic Tests' },
                    { id: 'scheme', label: 'Health Schemes' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSearchCategory(tab.id as any)}
                      className={`rounded-full px-3 py-1.5 transition-all ${
                        searchCategory === tab.id
                          ? 'bg-gov-navy text-white shadow-sm'
                          : 'text-gov-gray-600 hover:bg-gov-gray-100'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      value={searchKeyword}
                      onChange={(e) => setSearchKeyword(e.target.value)}
                      placeholder="e.g. Nashik Civil Hospital, Metformin 500mg, CBC Test, PM-JAY, Dr. Patil..."
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm text-slate-800 outline-none transition focus:border-gov-navy focus:bg-white focus:ring-2 focus:ring-gov-navy/20"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gov-saffron px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-white transition hover:bg-[#c24615]"
                  >
                    Search
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-200">
                <span className="font-semibold text-white">Frequent Searches:</span>
                <Link to="/facilities" className="underline decoration-white/40 underline-offset-4 hover:text-amber-300">District Civil Hospital</Link>
                <span className="text-slate-400">•</span>
                <Link to="/citizen/medicines" className="underline decoration-white/40 underline-offset-4 hover:text-amber-300">Insulin & Metformin</Link>
                <span className="text-slate-400">•</span>
                <Link to="/citizen/triage" className="underline decoration-white/40 underline-offset-4 hover:text-amber-300">Fever & Dengue Triage</Link>
                <span className="text-slate-400">•</span>
                <Link to="/schemes" className="underline decoration-white/40 underline-offset-4 hover:text-amber-300">Ayushman Bharat PM-JAY</Link>
              </div>
            </div>

            <div className="space-y-4">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-sm">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
                  alt="Doctor consulting a patient during a rural primary healthcare outreach session"
                  className="h-64 w-full object-cover sm:h-72"
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/25 p-4 text-left shadow-xl backdrop-blur-sm">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-amber-300">Public Health Platform</div>
                <h2 className="text-xl font-bold text-white">Community-first healthcare delivery</h2>
                <p className="mt-2 text-xs leading-relaxed text-slate-200">
                  Designed to connect community health workers, frontline clinics, rural hospitals, and digital records in one transparent workflow.
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-semibold text-slate-100">
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
                    <div className="text-lg font-black text-amber-300">1.48Cr</div>
                    <div>Citizens</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
                    <div className="text-lg font-black text-emerald-300">1,842</div>
                    <div>Facilities</div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-3">
                    <div className="text-lg font-black text-sky-300">24×7</div>
                    <div>Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 space-y-12">
        <section className="rounded-2xl border border-rose-200 bg-gradient-to-r from-rose-50 via-white to-rose-50 p-5 shadow-[0_16px_38px_rgba(190,24,93,0.08)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-3">
              <div className="rounded-xl border border-rose-200 bg-rose-100 p-3 text-rose-700 shadow-sm">
                <Siren className="h-6 w-6" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-rose-700">
                  Emergency Medical Assistance
                </div>
                <h2 className="mt-1 text-xl font-bold text-gov-navy">
                  Search patient profile and dispatch coordination support
                </h2>
                <p className="mt-1 text-xs text-slate-600">
                  Prototype lookup for emergency response teams to verify patient identity and priority contact details.
                </p>
              </div>
            </div>

            <div className="inline-flex items-center rounded-full border border-rose-200 bg-white px-3 py-1.5 text-xs font-semibold text-gov-navy shadow-sm">
              24x7 emergency response support
            </div>
          </div>

          <form onSubmit={handleEmergencyLookup} className="mt-5 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 max-w-2xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={emergencyPatientId}
                onChange={(e) => setEmergencyPatientId(e.target.value)}
                placeholder="Enter Patient ID (PAT-1001)"
                className="w-full pl-9 pr-3 py-2.5 border border-rose-200 rounded-lg bg-white text-sm text-gov-navy focus:outline-none focus:ring-2 focus:ring-rose-300"
              />
            </div>
            <button
              type="submit"
              className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-colors"
            >
              Search Patient
            </button>
          </form>

          {emergencyError && (
            <div className="mt-3 text-xs text-rose-700 bg-white border border-rose-200 rounded-md px-3 py-2">
              {emergencyError}
            </div>
          )}

          {emergencyResult && (
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-white border border-rose-200 rounded-lg p-4">
                <div className="text-[10px] uppercase font-bold text-slate-500">Patient</div>
                <div className="mt-1 text-base font-bold text-gov-navy">{emergencyResult.name}</div>
                <div className="text-xs text-slate-600 mt-1">ID: {emergencyResult.patientId} • Age {emergencyResult.age}</div>
                <div className="text-xs text-slate-600 mt-1 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{emergencyResult.address}</div>
              </div>
              <div className="bg-white border border-rose-200 rounded-lg p-4">
                <div className="text-[10px] uppercase font-bold text-slate-500">Medical Priority</div>
                <div className="mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-bold bg-rose-100 text-rose-800">
                  {emergencyResult.highRisk ? 'High risk intervention' : 'Stable observation'}
                </div>
                <div className="text-xs text-slate-600 mt-3">
                  Conditions: {emergencyResult.currentConditions.join(', ')}
                </div>
              </div>
              <div className="bg-white border border-rose-200 rounded-lg p-4">
                <div className="text-[10px] uppercase font-bold text-slate-500">Emergency Contact</div>
                <div className="mt-1 text-sm font-bold text-gov-navy">{emergencyResult.emergencyContact}</div>
                <div className="text-xs text-slate-600 mt-2">
                  {emergencyResult.emergencyFlag ? 'Immediate emergency flag active' : 'Routine contact available'}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* SECTION 4: Citizen Core Services Grid */}
        <section>
          <div className="border-b-2 border-gov-navy pb-2 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
                Public Gateway
              </span>
              <h2 className="text-xl font-bold text-gov-navy">
                {t.citizenServicesTitle}
              </h2>
            </div>
            <Link to="/services" className="text-xs font-bold text-gov-navy hover:underline flex items-center gap-1">
              <span>View All 16 Services</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {citizenServiceTiles.map((tile) => {
              const Icon = tile.icon;
              return (
                <Link
                  key={tile.title}
                  to={tile.path}
                  className={`bg-white border rounded-lg p-4 transition-all hover:shadow-md hover:border-gov-navy group flex flex-col justify-between ${
                    tile.alert ? 'border-rose-300 bg-rose-50/20' : 'border-gov-gray-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2.5 rounded-lg border ${tile.alert ? 'bg-rose-100 border-rose-200' : 'bg-slate-50 border-slate-200'}`}>
                        <Icon className={`w-5 h-5 ${tile.color}`} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-gov-navy group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <h3 className="font-bold text-gov-navy text-sm group-hover:text-gov-saffron transition-colors">
                      {tile.title}
                    </h3>
                    <p className="mt-1 text-xs text-gov-gray-600 leading-relaxed">
                      {tile.desc}
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 text-[11px] font-semibold text-gov-navy">
                    Access Service →
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SECTION 5: Digital Health Services & ABHA Records */}
        <section className="bg-slate-50 border border-gov-gray-300 rounded-xl p-6">
          <div className="border-b border-gov-gray-200 pb-3 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
                Ayushman Bharat Digital Ecosystem
              </span>
              <h2 className="text-xl font-bold text-gov-navy">
                {t.digitalHealthTitle}
              </h2>
            </div>
            <Link to="/citizen/records" className="bg-gov-navy text-white text-xs font-bold px-3 py-1.5 rounded hover:bg-gov-navyLight">
              Open Full Patient Health Record (PHR)
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {digitalHealthCards.map((card) => (
              <Link
                key={card.title}
                to={card.path}
                className="bg-white border border-gov-gray-200 rounded p-4 shadow-xs hover:border-gov-navy transition-all group"
              >
                <div className="text-[11px] font-bold uppercase text-gov-saffron">{card.count}</div>
                <div className="font-bold text-gov-navy text-sm mt-0.5 group-hover:text-gov-navyLight">
                  {card.title}
                </div>
                <p className="text-xs text-gov-gray-600 mt-1.5 leading-snug">
                  {card.desc}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* SECTION 6: Health Programmes */}
        <section>
          <div className="border-b-2 border-gov-navy pb-2 mb-6">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              National Health Mission (NHM)
            </span>
            <h2 className="text-xl font-bold text-gov-navy">
              {t.programmesTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {healthProgrammes.map((prog) => {
              const Icon = prog.icon;
              return (
                <div key={prog.title} className="bg-white border border-gov-gray-200 rounded-lg p-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-gov-navy mb-3">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gov-navy text-sm">{prog.title}</h3>
                  <p className="text-xs text-gov-gray-600 mt-1 leading-relaxed">
                    {prog.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 7: Public Health Dashboard (Demo Aggregated Metrics) */}
        <section className="bg-gov-navy text-white rounded-xl p-6 shadow-md border-t-4 border-gov-saffron">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-700 pb-4 mb-6">
            <div>
              <span className="bg-amber-400 text-slate-900 font-bold text-[10px] uppercase px-2 py-0.5 rounded">
                Aggregated State Health Intelligence (DEMO DATA)
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                {t.dashboardTitle}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                Real-time operational indicators across 36 districts of Maharashtra.
              </p>
            </div>
            <Link
              to="/government/dashboard"
              className="bg-white text-gov-navy px-4 py-2 rounded text-xs font-bold hover:bg-slate-100 transition-colors self-start md:self-auto"
            >
              Access Government Analytics Portal →
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Registered Citizens</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">1.48 Cr</div>
              <div className="text-[11px] text-emerald-400 mt-1 font-medium">↑ 98.4% ABHA seeded</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Active Facilities</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">1,842</div>
              <div className="text-[11px] text-slate-300 mt-1">Sub-Centres to Civil Hospitals</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Teleconsultations</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">1.83 Lakh</div>
              <div className="text-[11px] text-slate-300 mt-1">e-Sanjeevani remote visits</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Referral Completion</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 mt-1">88.4%</div>
              <div className="text-[11px] text-slate-300 mt-1">Closed-loop facility transfers</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Essential Drug Stock</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">94.2%</div>
              <div className="text-[11px] text-emerald-400 mt-1">Zero stock-outs in 14 districts</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Diagnostic Availability</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">96.8%</div>
              <div className="text-[11px] text-slate-300 mt-1">Standard 63 lab tests at PHC</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">High-Risk ANC Follow-ups</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">91.5%</div>
              <div className="text-[11px] text-emerald-400 mt-1">Tracked by ASHA workers</div>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-lg">
              <div className="text-slate-400 text-xs font-semibold uppercase">Emergency 108 Fleet</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 mt-1">982 Vans</div>
              <div className="text-[11px] text-slate-300 mt-1">Average response: 18 mins</div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Important Notices Table */}
        <section>
          <div className="border-b-2 border-gov-navy pb-2 mb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
                Official Gazettes & Bulletins
              </span>
              <h2 className="text-xl font-bold text-gov-navy">
                {t.noticesTitle}
              </h2>
            </div>
            <Link to="/notices" className="text-xs font-bold text-gov-navy hover:underline">
              View Notice Archive →
            </Link>
          </div>

          <div className="bg-white border border-gov-gray-300 rounded-lg overflow-hidden shadow-xs">
            <div className="divide-y divide-gov-gray-200 text-xs">
              {MOCK_NOTICES.slice(0, 4).map((notice) => (
                <div key={notice.id} className="p-3.5 hover:bg-gov-gray-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-gov-navy bg-slate-100 px-2 py-0.5 rounded">
                        {notice.date}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {notice.department}
                      </span>
                      {notice.isImportant && (
                        <span className="bg-gov-emergency text-white text-[9px] font-bold px-1.5 py-0.2 rounded">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="font-bold text-gov-navy text-xs sm:text-sm">
                      {notice.title}
                    </div>
                    <p className="text-gov-gray-600 text-[11px]">
                      {notice.summary}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-2">
                    <button
                      onClick={() => alert(`Opening PDF document: ${notice.title} (${notice.pdfFileSize})`)}
                      className="border border-gov-gray-300 hover:bg-slate-100 text-gov-navy px-3 py-1.5 rounded font-semibold text-xs flex items-center gap-1"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF ({notice.pdfFileSize})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 9: Health Schemes Spotlight */}
        <section>
          <div className="border-b-2 border-gov-navy pb-2 mb-6 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
                Financial Protection & Welfare
              </span>
              <h2 className="text-xl font-bold text-gov-navy">
                {t.schemesTitle}
              </h2>
            </div>
            <Link to="/schemes" className="text-xs font-bold text-gov-navy hover:underline">
              Explore All Schemes →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_SCHEMES.slice(0, 3).map((scheme) => (
              <div key={scheme.id} className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {scheme.category}
                    </span>
                    <span className="font-bold text-xs text-gov-navy">{scheme.shortCode}</span>
                  </div>
                  <h3 className="font-bold text-gov-navy text-sm leading-snug">
                    {scheme.name}
                  </h3>
                  <div className="mt-2 bg-slate-50 p-2.5 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 font-semibold uppercase">Coverage Limit</div>
                    <div className="text-xs font-bold text-emerald-800">{scheme.coverageAmount}</div>
                  </div>

                  <div className="mt-3 text-xs space-y-1.5">
                    <div className="font-semibold text-slate-700 text-[11px]">Key Eligibility:</div>
                    <ul className="list-disc list-inside text-slate-600 text-[11px] space-y-0.5">
                      {scheme.eligibility.slice(0, 2).map((e, idx) => (
                        <li key={idx} className="truncate">{e}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                  <Link to="/schemes" className="font-bold text-gov-navy hover:underline">
                    Check Eligibility & Process
                  </Link>
                  <a
                    href={scheme.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-slate-800 flex items-center gap-1 text-[11px]"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: Health Awareness & Preventative Guidelines */}
        <section className="bg-slate-50 border border-slate-200 rounded-lg p-6">
          <div className="border-b border-slate-300 pb-3 mb-4">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Health Literacy & Preventative Protocols
            </span>
            <h2 className="text-xl font-bold text-gov-navy">
              {t.awarenessTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="bg-white p-4 rounded border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-gov-saffron uppercase">Vector Control</span>
              <h4 className="font-bold text-gov-navy text-sm">Monsoon Dengue & Malaria Prevention</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Empty cooler water and discarded tyres every Friday. Observe 'Dry Day' once a week to break Aedes mosquito breeding cycles.
              </p>
            </div>

            <div className="bg-white p-4 rounded border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-gov-green uppercase">Non-Communicable</span>
              <h4 className="font-bold text-gov-navy text-sm">30-Day Hypertension Salt Reduction</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                Limit daily sodium to under 5g (1 teaspoon). Visit your local Sub-Centre Health & Wellness Centre for free monthly digital BP checks.
              </p>
            </div>

            <div className="bg-white p-4 rounded border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-gov-navy uppercase">Maternal Nutrition</span>
              <h4 className="font-bold text-gov-navy text-sm">Iron Folic Acid (IFA) 180-Day Regimen</h4>
              <p className="text-slate-600 leading-relaxed text-[11px]">
                All pregnant mothers must consume one red IFA tablet daily starting from the 4th month through 6 months post-delivery.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 11: Important Reference Links */}
        <section className="border-t border-gov-gray-300 pt-6">
          <div className="text-xs font-bold text-gov-navy uppercase tracking-wider mb-4">
            {t.importantLinksTitle}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {[
              { name: 'Ministry of Health & Family Welfare', url: 'https://www.mohfw.gov.in' },
              { name: 'Ayushman Bharat Digital Mission (ABDM)', url: 'https://abdm.gov.in' },
              { name: 'National Health Portal of India', url: 'https://www.nhp.gov.in' },
              { name: 'National Health Authority (NHA)', url: 'https://nha.gov.in' },
              { name: 'e-Sanjeevani National Teleconsultation', url: 'https://esanjeevani.mohfw.gov.in' },
              { name: 'Pradhan Mantri Jan Arogya Yojana', url: 'https://pmjay.gov.in' },
              { name: 'Public Health Department, Maharashtra', url: 'https://arogya.maharashtra.gov.in' },
              { name: 'GIGW Guidelines for Indian Websites', url: 'https://guidelines.india.gov.in' },
            ].map((lnk) => (
              <a
                key={lnk.name}
                href={lnk.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border border-gov-gray-200 p-2.5 rounded hover:border-gov-navy hover:bg-slate-50 transition-colors flex items-center justify-between text-slate-700"
              >
                <span className="truncate pr-1 font-medium">{lnk.name}</span>
                <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};
