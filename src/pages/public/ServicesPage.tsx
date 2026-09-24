import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
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
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  FileSpreadsheet
} from 'lucide-react';
import { ImageWithFallback } from '../../components/common/ImageWithFallback';
import { useAccessibility } from '../../context/AccessibilityContext';

export const ServicesPage: React.FC = () => {
  const { t } = useAccessibility();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Citizen' | 'Clinical' | 'Diagnostics' | 'Emergency'>('All');

  const ALL_SERVICES = [
    {
      id: 'srv-1',
      title: 'Find Healthcare Facility',
      desc: 'Directory of Sub-Centres, PHCs, Rural Hospitals, and District Hospitals with geo-coordinates and bed capacities.',
      category: 'Citizen',
      icon: Building2,
      path: '/facilities',
      targetAudience: 'All Citizens',
      portalLevel: 'State-wide'
    },
    {
      id: 'srv-2',
      title: 'Find Specialist Doctor',
      desc: 'Search physicians by specialty, OPD duty timings, room allocation, and consultation days.',
      category: 'Citizen',
      icon: UserCheck,
      path: '/citizen/appointments',
      targetAudience: 'Patients',
      portalLevel: 'Hospital'
    },
    {
      id: 'srv-3',
      title: 'Book OPD Appointment & Digital Token',
      desc: 'Pre-register for outpatient consultations to bypass registration queues and get an estimated waiting token.',
      category: 'Citizen',
      icon: Calendar,
      path: '/citizen/appointments',
      targetAudience: 'Patients',
      portalLevel: 'Primary & Secondary'
    },
    {
      id: 'srv-4',
      title: 'e-Sanjeevani Teleconsultation',
      desc: 'Assisted video consultation connecting rural patients at Sub-Centres with district hospital specialist doctors.',
      category: 'Clinical',
      icon: Video,
      path: '/citizen/teleconsultation',
      targetAudience: 'Rural Citizens & ASHA',
      portalLevel: 'National Node'
    },
    {
      id: 'srv-5',
      title: 'Digital Health Records (PHR / ABHA)',
      desc: 'Unified patient health record displaying longitudinal medical timeline, past diagnoses, and verified lab results.',
      category: 'Citizen',
      icon: FileText,
      path: '/citizen/records',
      targetAudience: 'All Citizens',
      portalLevel: 'ABDM'
    },
    {
      id: 'srv-6',
      title: 'Digital Symptom Triage',
      desc: 'Point-of-care clinical decision support system categorizing patient urgency into Normal, Urgent, and Emergency.',
      category: 'Clinical',
      icon: Stethoscope,
      path: '/citizen/triage',
      targetAudience: 'Citizens & Field Workers',
      portalLevel: 'Community'
    },
    {
      id: 'srv-7',
      title: 'Medicine Availability & Drug Stock',
      desc: 'Real-time essential drug stock search across PHC pharmacies, low stock notifications, and batch expiry tracking.',
      category: 'Diagnostics',
      icon: Pill,
      path: '/citizen/medicines',
      targetAudience: 'Public & Pharmacists',
      portalLevel: 'Facility'
    },
    {
      id: 'srv-8',
      title: 'Diagnostic Lab Test Coordination',
      desc: 'Directory of available pathology, biochemistry, and radiology investigations with sample collection status.',
      category: 'Diagnostics',
      icon: TestTube,
      path: '/citizen/diagnostics',
      targetAudience: 'Patients & Labs',
      portalLevel: 'Facility'
    },
    {
      id: 'srv-9',
      title: 'Emergency 108 Ambulance Escalation',
      desc: 'Immediate emergency alert dispatch, nearest trauma care facility routing, and ICU bed availability.',
      category: 'Emergency',
      icon: AlertOctagon,
      path: '/citizen/emergency',
      targetAudience: 'Emergency Cases',
      portalLevel: '24x7 State Hub',
      alert: true
    },
    {
      id: 'srv-10',
      title: 'Multi-Tier Referral Tracking Chain',
      desc: 'Inter-facility transfer workflow tracking patient journey from Sub-Centre to District Hospital with closed-loop feedback.',
      category: 'Clinical',
      icon: Share2,
      path: '/citizen/referrals',
      targetAudience: 'Doctors & Patients',
      portalLevel: 'Inter-Hospital'
    },
    {
      id: 'srv-11',
      title: 'Government Health Schemes Directory',
      desc: 'Searchable database of PM-JAY, MJPJAY, PMSMA, and Vaya Vandana welfare schemes with eligibility verification.',
      category: 'Citizen',
      icon: Award,
      path: '/schemes',
      targetAudience: 'Beneficiaries',
      portalLevel: 'Govt. Schemes'
    },
    {
      id: 'srv-12',
      title: 'Arogya Saathi (AI Health Assistant)',
      desc: 'Multilingual conversational triage bot collecting symptoms and producing structured clinical summaries for doctors.',
      category: 'Citizen',
      icon: Bot,
      path: '/citizen/assistant',
      targetAudience: 'Citizens',
      portalLevel: 'Interactive'
    }
  ];

  const filtered = ALL_SERVICES.filter((srv) => {
    const matchesCat = categoryFilter === 'All' || srv.category === categoryFilter;
    const matchesQ =
      srv.title.toLowerCase().includes(query.toLowerCase()) ||
      srv.desc.toLowerCase().includes(query.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b-2 border-gov-navy pb-4">
        <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
          Integrated Portal Catalog
        </span>
        <h1 className="text-2xl sm:text-3xl font-bold text-gov-navy mt-1">
          {t.navServices}
        </h1>
        <p className="text-sm text-gov-gray-600 mt-1">
          Access all public health digital services for citizens, clinical personnel, and healthcare facilities.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-4">
        <div className="overflow-hidden rounded-2xl border border-gov-gray-300 bg-white shadow-sm">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1538108149393-fbbd81895977?auto=format&fit=crop&w=1200&q=80"
            alt="Healthcare workers and patient using a telehealth consultation in a rural clinic"
            className="h-64 w-full object-cover"
          />
        </div>
        <div className="rounded-2xl border border-gov-gray-200 bg-slate-50 p-5 shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gov-saffron">PROTOTYPE / DEMO</div>
          <h2 className="mt-2 text-lg font-bold text-gov-navy">Public health service access</h2>
          <p className="mt-2 text-xs leading-relaxed text-slate-600">
            Rural citizen access, teleconsultation, diagnostics, medicine availability, referral flow, and facility coordination across the public health pathway.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] font-semibold text-gov-navy">
            <div className="rounded bg-white border border-gov-gray-200 p-2">Teleconsultation</div>
            <div className="rounded bg-white border border-gov-gray-200 p-2">PHC</div>
            <div className="rounded bg-white border border-gov-gray-200 p-2">Rural Hospital</div>
            <div className="rounded bg-white border border-gov-gray-200 p-2">Emergency</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white p-4 border border-gov-gray-300 rounded-lg shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          <span className="font-semibold text-slate-500 mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          {['All', 'Citizen', 'Clinical', 'Diagnostics', 'Emergency'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as any)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                categoryFilter === cat
                  ? 'bg-gov-navy text-white'
                  : 'bg-gov-gray-100 text-gov-gray-700 hover:bg-gov-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search service by name or keyword..."
            className="w-full pl-9 pr-3 py-1.5 border border-gov-gray-300 rounded focus:ring-1 focus:ring-gov-navy focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { title: 'Teleconsultation', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=900&q=80' },
          { title: 'Primary Health Centre', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80' },
          { title: 'Rural Hospital', image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895977?auto=format&fit=crop&w=900&q=80' },
          { title: 'Emergency Assistance', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=80' }
        ].map((item) => (
          <div key={item.title} className="overflow-hidden rounded-xl border border-gov-gray-200 bg-white shadow-sm">
            <ImageWithFallback src={item.image} alt={item.title} className="h-40 w-full object-cover" />
            <div className="p-3 text-sm font-bold text-gov-navy">{item.title}</div>
          </div>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((service) => {
          const Icon = service.icon;
          return (
            <div
              key={service.id}
              className={`bg-white border rounded-lg p-5 shadow-xs flex flex-col justify-between transition-all hover:border-gov-navy hover:shadow-md ${
                service.alert ? 'border-rose-300 bg-rose-50/20' : 'border-gov-gray-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg border ${service.alert ? 'bg-rose-100 text-gov-emergency border-rose-300' : 'bg-slate-50 text-gov-navy border-slate-200'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {service.category}
                  </span>
                </div>

                <h3 className="font-bold text-gov-navy text-base">
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-gov-gray-600 leading-relaxed">
                  {service.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Audience: <strong>{service.targetAudience}</strong></span>
                  <span className="bg-slate-100 px-1.5 py-0.5 rounded text-[10px]">{service.portalLevel}</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <Link
                  to={service.path}
                  className={`w-full py-2 rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                    service.alert
                      ? 'bg-gov-emergency text-white hover:bg-rose-800'
                      : 'bg-gov-navy text-white hover:bg-gov-navyLight'
                  }`}
                >
                  <span>Launch Service Workflow</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 bg-white border border-gov-gray-200 rounded-lg text-slate-500 text-xs">
          No public health services matched your search filter "{query}".
        </div>
      )}
    </div>
  );
};
