import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DISTRICT_METRICS, DISEASE_TRENDS, FACILITY_TIER_METRICS } from '../../data/mockGovtAnalytics';
import {
  Building2,
  Users,
  Activity,
  MapPin,
  TrendingUp,
  ShieldCheck,
  AlertOctagon,
  Share2,
  Pill,
  TestTube,
  Video,
  Download,
  Filter
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
  AreaChart,
  Area
} from 'recharts';

export const GovernmentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [selectedDistrict, setSelectedDistrict] = useState<string>('All');

  const districts = ['All', ...DISTRICT_METRICS.map(d => d.district)];

  const filteredDistricts = DISTRICT_METRICS.filter(
    (d) => selectedDistrict === 'All' || d.district === selectedDistrict
  );

  return (
    <div className="space-y-6 text-xs">
      {/* State Masthead */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Directorate of Health Services, Maharashtra
            </span>
            <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded">
              Aggregated Public Health Intel (NO PII)
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gov-navy mt-1">
            Integrated Disease Surveillance & Public Health Dashboard
          </h1>
          <div className="text-xs text-slate-600 mt-0.5">
            Health Commissioner: <strong>{user.name}</strong> • State Central Registry • Last Updated: 19 Sep 2026, 16:00 IST
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Aggregated Epidemiological Health Bulletin (PDF) generated.")}
            className="bg-gov-navy text-white px-4 py-2 rounded text-xs font-bold hover:bg-gov-navyLight flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export State Health Bulletin</span>
          </button>
        </div>
      </div>

      {/* Aggregated State Health KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Registered Citizens</div>
          <div className="text-2xl font-black text-gov-navy mt-0.5">1.48 Cr</div>
          <div className="text-[9px] text-emerald-700 font-semibold">98.4% ABHA seeded</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Active Public Facilities</div>
          <div className="text-2xl font-black text-gov-navy mt-0.5">1,842</div>
          <div className="text-[9px] text-slate-400">Sub-Centres to GMCs</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Today's Total OPD Visits</div>
          <div className="text-2xl font-black text-gov-navy mt-0.5">84,290</div>
          <div className="text-[9px] text-emerald-700 font-semibold">State-wide OPD footfall</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">e-Sanjeevani Teleconsults</div>
          <div className="text-2xl font-black text-emerald-800 mt-0.5">18,340</div>
          <div className="text-[9px] text-slate-400">Completed today</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-emerald-800 uppercase font-semibold">Referral Completion</div>
          <div className="text-2xl font-black text-emerald-900 mt-0.5">88.4%</div>
          <div className="text-[9px] text-emerald-700 font-semibold">Closed-loop feedback</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">High-Risk ANC Tracked</div>
          <div className="text-2xl font-black text-gov-saffron mt-0.5">91.5%</div>
          <div className="text-[9px] text-slate-400">By field ASHA workers</div>
        </div>
      </div>

      {/* Disease Surveillance & Trends (IDSP) Chart */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gov-gray-200 pb-2">
          <div>
            <h2 className="font-bold text-gov-navy text-xs uppercase tracking-wider">
              Integrated Disease Surveillance Programme (IDSP) — 6-Month Epidemiological Trajectory
            </h2>
            <p className="text-[11px] text-slate-500">
              Aggregated monthly caseload across Non-Communicable Diseases (HTN, Diabetes) and Vector-Borne Outbreaks (Dengue).
            </p>
          </div>
          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-semibold">
            Maharashtra State Registry
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DISEASE_TRENDS}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="hypertension" stroke="#0B3B60" strokeWidth={2} name="Hypertension (NCD)" />
              <Line type="monotone" dataKey="diabetes" stroke="#137333" strokeWidth={2} name="Diabetes Mellitus" />
              <Line type="monotone" dataKey="dengue" stroke="#B91C1C" strokeWidth={2.5} name="Dengue Cases (Vector-Borne)" />
              <Line type="monotone" dataKey="maternalHighRisk" stroke="#D9531E" strokeWidth={1.5} strokeDasharray="3 3" name="High-Risk ANC" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Maharashtra Geographic Health Network Visualization Concept */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gov-gray-200 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gov-saffron" />
              <h3 className="font-bold text-gov-navy text-xs uppercase tracking-wider">
                Maharashtra Regional Health Operations Matrix (District-Wise Demo)
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Geographic monitoring of patient footfall, active facilities, drug stock health, and referral compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-500 text-[11px]">Filter District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-1 border border-gov-gray-300 rounded bg-white text-xs"
            >
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {/* District Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredDistricts.map((item) => (
            <div
              key={item.district}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-gov-navy transition-all space-y-2"
            >
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="font-bold text-gov-navy text-sm">{item.district}</span>
                <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-semibold">
                  Pop: {item.populationLakhs}L
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700">
                <div>
                  <span className="text-slate-500 block text-[10px]">Today's OPD:</span>
                  <strong className="text-gov-navy">{item.opdVisitsToday.toLocaleString()}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Active Facilities:</span>
                  <strong>{item.activeFacilities}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Tele-OPD Today:</span>
                  <strong className="text-emerald-800">{item.teleconsultsToday}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px]">Referral Success:</span>
                  <strong className="text-amber-800">{item.referralSuccessRate}%</strong>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">Drug Stock: <strong className="text-emerald-700">{item.medicineAvailabilityPercent}%</strong></span>
                <span className="text-slate-500">Dengue Cases: <strong className="text-rose-700">{item.activeDengueCases}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Tier Facility Infrastructure Workload Breakdown */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
        <h3 className="font-bold text-gov-navy text-xs uppercase tracking-wider border-b border-gov-gray-200 pb-2">
          Public Health 5-Tier System Workload & Capacity
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200">
            <thead className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px]">
              <tr>
                <th className="p-2.5 border-b">Infrastructure Tier</th>
                <th className="p-2.5 border-b">Operational Units</th>
                <th className="p-2.5 border-b">Daily Average Visits</th>
                <th className="p-2.5 border-b">Avg. Wait Time</th>
                <th className="p-2.5 border-b">Teleconsultation Node</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {FACILITY_TIER_METRICS.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="p-2.5 font-bold text-gov-navy">{t.tier}</td>
                  <td className="p-2.5 font-mono">{t.count.toLocaleString()}</td>
                  <td className="p-2.5 font-mono">{t.dailyVisits.toLocaleString()}</td>
                  <td className="p-2.5 font-semibold text-slate-900">~{t.avgWaitMins} mins</td>
                  <td className="p-2.5">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      e-Sanjeevani Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
