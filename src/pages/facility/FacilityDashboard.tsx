import React from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  Building2,
  Users,
  Clock,
  Share2,
  Pill,
  TestTube,
  Activity,
  Bed,
  CheckCircle2,
  AlertTriangle,
  TrendingUp
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
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const FacilityDashboard: React.FC = () => {
  const { user } = useAuth();

  const hourlyVolumeData = [
    { hour: '08:00', patients: 35 },
    { hour: '09:00', patients: 85 },
    { hour: '10:00', patients: 140 },
    { hour: '11:00', patients: 110 },
    { hour: '12:00', patients: 65 },
    { hour: '13:00', patients: 45 },
  ];

  const specialtyWorkload = [
    { name: 'General Medicine', count: 185 },
    { name: 'Obstetrics (MCH)', count: 110 },
    { name: 'Pediatrics', count: 75 },
    { name: 'Orthopaedics', count: 65 },
    { name: 'Casualty / Emergency', count: 45 },
  ];

  const bedOccupancyData = [
    { name: 'Occupied Beds', value: 412, color: '#0B3B60' },
    { name: 'Available Beds', value: 88, color: '#137333' },
  ];

  return (
    <div className="space-y-6 text-xs">
      {/* Facility Header */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              Hospital Operations Administration
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              500 Bedded Tertiary Hub
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gov-navy mt-1">
            District Civil Hospital, Nashik
          </h1>
          <div className="text-xs text-slate-600 mt-0.5">
            Superintendent: <strong>{user.name}</strong> • National Health Registry ID: NIN-401928-DH
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-slate-50 border border-slate-200 p-2.5 rounded text-right">
            <div className="text-[10px] text-slate-500 font-semibold uppercase">Total Bed Occupancy</div>
            <div className="text-base font-extrabold text-gov-navy">412 / 500 (82.4%)</div>
          </div>
        </div>
      </div>

      {/* Metrics Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-center">
        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Today's OPD Count</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">480</div>
          <div className="text-[9px] text-emerald-600 font-semibold">↑ 12% vs last week</div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-amber-800 uppercase font-semibold">Current Queue Active</div>
          <div className="text-2xl font-extrabold text-amber-900 mt-0.5">64</div>
          <div className="text-[9px] text-amber-700">Across 12 OPD rooms</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Avg. OPD Waiting Time</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">35m</div>
          <div className="text-[9px] text-slate-400">Target: &lt; 45m</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Referrals Inflow</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">24</div>
          <div className="text-[9px] text-slate-400">From PHCs & Sub-Centres</div>
        </div>

        <div className="bg-emerald-50 border border-emerald-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-emerald-800 uppercase font-semibold">Referral Completion</div>
          <div className="text-2xl font-extrabold text-emerald-900 mt-0.5">91.2%</div>
          <div className="text-[9px] text-emerald-700">Closed-loop feedback</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Pharmacy Stock Health</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">94.2%</div>
          <div className="text-[9px] text-rose-600 font-semibold">3 items low stock</div>
        </div>
      </div>

      {/* Visual Workload Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Hourly OPD Patient Footfall */}
        <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
            <h2 className="font-bold text-gov-navy text-xs uppercase tracking-wider">
              Today's Hourly Patient Volume Footfall
            </h2>
            <span className="text-[10px] text-slate-400">08:00 AM - 02:00 PM OPD</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hourlyVolumeData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="patients" fill="#0B3B60" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Specialty Department OPD Distribution */}
        <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
            <h2 className="font-bold text-gov-navy text-xs uppercase tracking-wider">
              Workload by Clinical Specialty
            </h2>
            <span className="text-[10px] text-slate-400">Total 480 OPD consultations</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={specialtyWorkload} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 10 }} />
                <YAxis dataKey="name" type="category" width={110} tick={{ fontSize: 9 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#D9531E" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* OPD Room Utilization Grid */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
          <h3 className="font-bold text-gov-navy text-xs uppercase tracking-wider">
            Live Consultation Room Status
          </h3>
          <span className="text-slate-500 font-semibold">12 Active Consultation Rooms</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {[
            { room: 'Room 1 (Gen Med)', doctor: 'Dr. S. K. Joshi', serving: '#24', status: 'Active' },
            { room: 'Room 2 (Gen Med)', doctor: 'Dr. P. R. Wagh', serving: '#18', status: 'Active' },
            { room: 'Room 4 (Diabetology)', doctor: 'Dr. Ananya Patil', serving: '#13', status: 'Active' },
            { room: 'Room 6 (Pediatrics)', doctor: 'Dr. V. B. More', serving: '#16', status: 'Active' },
            { room: 'Room 8 (Ob-Gyn)', doctor: 'Dr. Neha Kulkarni', serving: '#22', status: 'Active' },
            { room: 'Room 11 (Orthopedics)', doctor: 'Dr. R. Deshmukh', serving: '#11', status: 'Active' },
          ].map((rm, i) => (
            <div key={i} className="bg-slate-50 p-3 rounded border border-slate-200 text-center space-y-1">
              <div className="font-bold text-gov-navy text-xs">{rm.room}</div>
              <div className="text-[10px] text-slate-500 truncate">{rm.doctor}</div>
              <div className="text-sm font-black text-emerald-800 bg-white p-1 rounded border border-slate-200 mt-1">
                Token {rm.serving}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
