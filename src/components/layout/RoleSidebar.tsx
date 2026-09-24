import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useOffline } from '../../context/OfflineContext';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Clock,
  Stethoscope,
  Video,
  Share2,
  TestTube,
  Pill,
  Award,
  AlertOctagon,
  Bot,
  Users,
  AlertTriangle,
  FolderSync,
  Building2,
  TrendingUp,
  Activity,
  MapPin,
  ClipboardList
} from 'lucide-react';

interface SidebarLink {
  name: string;
  path: string;
  icon: any;
  alert?: boolean;
  badge?: string;
}

export const RoleSidebar: React.FC = () => {
  const { role, user } = useAuth();
  const { t } = useAccessibility();
  const { pendingItems, isOnline } = useOffline();

  const citizenLinks: SidebarLink[] = [
    { name: 'Dashboard', path: '/citizen/dashboard', icon: LayoutDashboard },
    { name: 'My Health Records (PHR)', path: '/citizen/records', icon: FileText },
    { name: 'OPD Appointments', path: '/citizen/appointments', icon: Calendar },
    { name: 'Live Queue Status', path: '/citizen/queue', icon: Clock },
    { name: 'Digital Triage', path: '/citizen/triage', icon: Stethoscope },
    { name: 'Teleconsultation', path: '/citizen/teleconsultation', icon: Video },
    { name: 'Referral Tracking', path: '/citizen/referrals', icon: Share2 },
    { name: 'Diagnostics & Lab', path: '/citizen/diagnostics', icon: TestTube },
    { name: 'Medicine Availability', path: '/citizen/medicines', icon: Pill },
    { name: 'Health Schemes', path: '/citizen/schemes', icon: Award },
    { name: 'Emergency 108', path: '/citizen/emergency', icon: AlertOctagon, alert: true },
    { name: 'AI Health Assistant', path: '/citizen/assistant', icon: Bot },
  ];

  const doctorLinks: SidebarLink[] = [
    { name: 'Clinical Dashboard', path: '/doctor/dashboard', icon: LayoutDashboard },
    { name: 'OPD Queue', path: '/doctor/queue', icon: Clock },
    { name: 'Patient Consultations', path: '/doctor/patients', icon: Users },
    { name: 'Triage Review', path: '/doctor/triage', icon: Stethoscope },
    { name: 'Tele-OPD Consult', path: '/doctor/teleconsultation', icon: Video },
    { name: 'Prescription Pad', path: '/doctor/prescriptions', icon: Pill },
    { name: 'Order Diagnostics', path: '/doctor/diagnostics', icon: TestTube },
    { name: 'Generate Referral', path: '/doctor/referrals', icon: Share2 },
    { name: 'High-Risk Follow-up', path: '/doctor/follow-up', icon: AlertTriangle },
  ];

  const healthWorkerLinks: SidebarLink[] = [
    { name: 'Field Dashboard', path: '/health-worker/dashboard', icon: LayoutDashboard },
    { name: 'Registered Patients', path: '/health-worker/patients', icon: Users },
    { name: 'High-Risk Follow-ups', path: '/health-worker/follow-ups', icon: AlertTriangle, badge: '4 Due' },
    { name: 'Assisted Teleconsult', path: '/health-worker/teleconsultation', icon: Video },
    { name: 'Field Referrals', path: '/health-worker/referrals', icon: Share2 },
    { name: 'Offline Field Records', path: '/health-worker/offline', icon: FolderSync, badge: pendingItems.length > 0 ? `${pendingItems.length}` : undefined },
  ];

  const facilityLinks: SidebarLink[] = [
    { name: 'Facility Overview', path: '/facility/dashboard', icon: LayoutDashboard },
    { name: 'OPD & Bed Queue', path: '/facility/queue', icon: Clock },
    { name: 'Referral Exchange Hub', path: '/facility/referrals', icon: Share2 },
    { name: 'Pharmacy Stock', path: '/facility/medicines', icon: Pill },
    { name: 'Diagnostic Pathology Lab', path: '/facility/diagnostics', icon: TestTube },
  ];

  const govtLinks: SidebarLink[] = [
    { name: 'State Public Health Monitor', path: '/government/dashboard', icon: LayoutDashboard },
    { name: 'District Surveillance', path: '/government/analytics', icon: MapPin },
    { name: 'Disease Trends (IDSP)', path: '/government/disease', icon: Activity },
    { name: 'Facility Infrastructure', path: '/government/facilities', icon: Building2 },
    { name: 'KPI Performance Matrix', path: '/government/performance', icon: TrendingUp },
  ];

  let links = citizenLinks;
  let roleTitle = 'Citizen / Patient Portal';
  if (role === 'doctor') {
    links = doctorLinks;
    roleTitle = 'Clinical Workstation';
  } else if (role === 'healthWorker') {
    links = healthWorkerLinks;
    roleTitle = 'ASHA / ANM Field Portal';
  } else if (role === 'facility') {
    links = facilityLinks;
    roleTitle = 'Facility Superintendent';
  } else if (role === 'government') {
    links = govtLinks;
    roleTitle = 'State Public Health Admin';
  }

  return (
    <aside aria-label="Portal Navigation" className="w-full lg:w-64 bg-white border-r border-gov-gray-200 shrink-0 p-3 space-y-4">
      
      {/* User Persona Profile Pill */}
      <div className="bg-gov-gray-50 border border-gov-gray-200 rounded p-3 text-xs">
        <div className="font-bold text-gov-navy truncate">{user.name}</div>
        <div className="text-[11px] text-gov-gray-600 font-medium truncate">{user.designation}</div>
        <div className="text-[11px] text-gov-gray-500 truncate mt-0.5">{user.facilityOrLocation}</div>
        <div className="mt-2 pt-2 border-t border-gov-gray-200 flex items-center justify-between">
          <span className="text-[10px] uppercase font-bold text-gov-navy tracking-wider">{roleTitle}</span>
          <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-amber-500'}`} />
        </div>
      </div>

      {/* Navigation items list */}
      <nav aria-label="Role Links" className="space-y-1 text-xs">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded transition-colors font-medium ${
                  isActive
                    ? 'bg-gov-navy text-white font-semibold'
                    : 'text-gov-gray-700 hover:bg-gov-gray-100 hover:text-gov-navy'
                } ${link.alert ? 'text-gov-emergency' : ''}`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${link.alert ? 'text-gov-emergency' : ''}`} />
                <span className="truncate">{link.name}</span>
              </div>
              {link.badge && (
                <span className="bg-gov-saffron text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

    </aside>
  );
};
