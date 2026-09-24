import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useOffline } from '../../context/OfflineContext';
import { MOCK_HIGH_RISK_PATIENTS } from '../../data/mockHighRisk';
import {
  Users,
  AlertTriangle,
  Heart,
  Baby,
  Activity,
  FolderSync,
  Video,
  Share2,
  Pill,
  Wifi,
  WifiOff,
  RefreshCw,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from '../../components/common/StatusBadge';

export const HealthWorkerDashboard: React.FC = () => {
  const { user } = useAuth();
  const { isOnline, pendingItems, syncNow, isSyncing, lastSyncTime } = useOffline();

  const dueFollowUps = MOCK_HIGH_RISK_PATIENTS.filter(p => p.status === 'Due' || p.status === 'Overdue');

  return (
    <div className="space-y-6 text-xs">
      {/* Health Worker Header */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-gov-saffron uppercase tracking-wider">
              ASHA / ANM Field Operations Console
            </span>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
              Sub-Centre Node Active
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gov-navy mt-1">
            {user.name}
          </h1>
          <div className="text-xs text-slate-600 mt-0.5">
            {user.designation} • {user.facilityOrLocation} • Phone: {user.phone}
          </div>
        </div>

        {/* Offline sync status strip */}
        <div className="flex flex-wrap items-center gap-2 bg-slate-50 border border-slate-200 p-2.5 rounded-lg shrink-0">
          <div className="flex items-center gap-1.5 mr-2">
            {isOnline ? (
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Wifi className="w-4 h-4" /> Connected
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-700 font-bold">
                <WifiOff className="w-4 h-4" /> Offline Mode
              </span>
            )}
          </div>

          <button
            onClick={() => syncNow()}
            disabled={isSyncing || pendingItems.length === 0 || !isOnline}
            className="bg-gov-saffron hover:bg-[#c24615] text-white px-3 py-1.5 rounded font-bold transition-colors disabled:opacity-40 flex items-center gap-1"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>Sync ({pendingItems.length})</span>
          </button>
        </div>
      </div>

      {/* Field Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 text-center">
        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Registered Village</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">1,240</div>
          <div className="text-[9px] text-slate-400">Total Population</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Today's Visits</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">8</div>
          <div className="text-[9px] text-slate-400">Household checks</div>
        </div>

        <div className="bg-rose-50 border border-rose-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-rose-800 uppercase font-semibold">High-Risk Patients</div>
          <div className="text-2xl font-extrabold text-rose-900 mt-0.5">4</div>
          <div className="text-[9px] text-rose-700">ANC / SAM / Chronic</div>
        </div>

        <div className="bg-amber-50 border border-amber-300 rounded p-3 shadow-xs">
          <div className="text-[10px] text-amber-800 uppercase font-semibold">Follow-ups Due</div>
          <div className="text-2xl font-extrabold text-amber-900 mt-0.5">{dueFollowUps.length}</div>
          <div className="text-[9px] text-amber-700">Immediate action</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Teleconsults</div>
          <div className="text-2xl font-extrabold text-gov-navy mt-0.5">3</div>
          <div className="text-[9px] text-slate-400">Scheduled today</div>
        </div>

        <div className="bg-white border border-gov-gray-200 rounded p-3 shadow-xs">
          <div className="text-[10px] text-slate-500 uppercase font-semibold">Pending Local Sync</div>
          <div className="text-2xl font-extrabold text-gov-saffron mt-0.5">{pendingItems.length}</div>
          <div className="text-[9px] text-slate-400">Stored locally</div>
        </div>
      </div>

      {/* High-Risk Priority Alert Section */}
      <div className="bg-white border border-gov-gray-300 rounded-lg p-5 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-gov-saffron" />
            <h2 className="font-bold text-gov-navy text-sm uppercase tracking-wider">
              Priority High-Risk Patient Follow-ups in Your Sub-Centre
            </h2>
          </div>
          <Link to="/health-worker/follow-ups" className="text-gov-navy font-bold hover:underline">
            View All Records →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_HIGH_RISK_PATIENTS.map((hrp) => (
            <div
              key={hrp.id}
              className={`p-4 rounded-lg border space-y-2.5 ${
                hrp.riskLevel === 'Severe'
                  ? 'border-rose-300 bg-rose-50/30'
                  : 'border-amber-300 bg-amber-50/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-gov-navy text-sm">{hrp.name} ({hrp.age}y, {hrp.gender})</span>
                <StatusBadge status={hrp.riskLevel + ' Risk'} size="sm" />
              </div>

              <div className="text-slate-600 text-[11px]">
                Category: <strong>{hrp.category}</strong> • Village: {hrp.village}
              </div>

              <p className="text-slate-700 text-xs leading-relaxed bg-white p-2.5 rounded border border-slate-200">
                {hrp.clinicalSummary}
              </p>

              <div className="text-[11px] flex flex-wrap items-center justify-between pt-1">
                <span className="text-slate-500">Next Follow-up: <strong className="text-slate-800">{hrp.nextFollowUpDate}</strong></span>
                <span className={`font-bold ${hrp.status === 'Overdue' ? 'text-gov-emergency' : 'text-amber-800'}`}>
                  ● {hrp.status}
                </span>
              </div>

              <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                <Link
                  to="/health-worker/teleconsultation"
                  className="bg-gov-navy text-white px-3 py-1.5 rounded font-bold text-[11px] hover:bg-gov-navyLight flex items-center gap-1"
                >
                  <Video className="w-3.5 h-3.5" />
                  <span>Launch Tele-OPD with Doctor</span>
                </Link>

                <button
                  onClick={() => alert(`SMS follow-up alert dispatched to ${hrp.name}.`)}
                  className="border border-slate-300 hover:bg-white text-slate-700 px-3 py-1.5 rounded font-semibold text-[11px]"
                >
                  Send Reminder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Worker Quick Action Tiles */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <Link
          to="/health-worker/patients"
          className="p-4 bg-white border border-gov-gray-200 rounded-lg shadow-xs hover:border-gov-navy transition-all group"
        >
          <Users className="w-6 h-6 text-gov-navy mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-gov-navy">Village Register</div>
          <div className="text-[10px] text-slate-500 mt-0.5">NCD & ANC Survey</div>
        </Link>

        <Link
          to="/health-worker/teleconsultation"
          className="p-4 bg-white border border-gov-gray-200 rounded-lg shadow-xs hover:border-gov-navy transition-all group"
        >
          <Video className="w-6 h-6 text-gov-saffron mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-gov-navy">Assisted Teleconsult</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Connect to PHC MO</div>
        </Link>

        <Link
          to="/citizen/medicines"
          className="p-4 bg-white border border-gov-gray-200 rounded-lg shadow-xs hover:border-gov-navy transition-all group"
        >
          <Pill className="w-6 h-6 text-gov-green mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-gov-navy">Drug Stock Finder</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Nearby PHC pharmacies</div>
        </Link>

        <Link
          to="/health-worker/offline"
          className="p-4 bg-white border border-gov-gray-200 rounded-lg shadow-xs hover:border-gov-navy transition-all group"
        >
          <FolderSync className="w-6 h-6 text-slate-700 mx-auto mb-1 group-hover:scale-110 transition-transform" />
          <div className="font-bold text-gov-navy">Offline Field Records</div>
          <div className="text-[10px] text-slate-500 mt-0.5">{pendingItems.length} records pending</div>
        </Link>
      </div>
    </div>
  );
};
