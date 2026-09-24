import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '../../context/AuthContext';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useNotifications } from '../../context/NotificationContext';
import { useOffline } from '../../context/OfflineContext';
import {
  Shield,
  Search,
  User,
  Bell,
  Wifi,
  WifiOff,
  RefreshCw,
  ChevronDown,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const GovernmentHeader: React.FC = () => {
  const { user, role, switchRole, isAuthenticated, logout } = useAuth();
  const { t } = useAccessibility();
  const { unreadCount, notifications, markAllAsRead } = useNotifications();
  const { isOnline, toggleConnectivity, pendingItems, syncNow, isSyncing } = useOffline();
  
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleRoleSelect = (newRole: UserRole) => {
    switchRole(newRole);
    setRoleDropdownOpen(false);
    if (newRole === 'citizen') navigate('/citizen/dashboard');
    else if (newRole === 'doctor') navigate('/doctor/dashboard');
    else if (newRole === 'healthWorker') navigate('/health-worker/dashboard');
    else if (newRole === 'facility') navigate('/facility/dashboard');
    else if (newRole === 'government') navigate('/government/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-white border-b border-gov-gray-200">
      {/* Top Identity Masthead */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        
        {/* Left: Emblem and Portal Branding */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-3 group focus:outline-none">
            {/* Original healthcare chakra emblem */}
            <div className="w-12 h-12 rounded-full border-2 border-gov-navy flex items-center justify-center bg-slate-50 text-gov-navy shadow-sm relative shrink-0">
              <Shield className="w-7 h-7 text-gov-navy" />
              <div className="absolute w-2 h-2 rounded-full bg-gov-saffron bottom-1 right-1 border border-white" />
            </div>

            <div>
              <div className="text-[11px] font-semibold tracking-wider text-gov-gray-600 uppercase">
                {t.govtHeaderSubtitle}
              </div>
              <div className="text-xl sm:text-2xl font-bold tracking-tight text-gov-navy flex items-center gap-2">
                <span>{t.portalTitle}</span>
                <span className="text-[10px] uppercase font-semibold tracking-normal px-2 py-0.5 bg-gov-gray-100 text-gov-gray-700 border border-gov-gray-300 rounded">
                  Prototype
                </span>
              </div>
              <div className="text-xs text-gov-gray-600 font-medium">
                {t.portalSubtitle}
              </div>
            </div>
          </Link>
        </div>

        {/* Center/Right: Search, Connectivity, Notifications, and Persona Switcher */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          
          {/* Quick Search */}
          <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-60 md:w-72">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-gov-gray-50 border border-gov-gray-300 rounded focus:bg-white focus:outline-none focus:ring-1 focus:ring-gov-navy"
            />
            <Search className="w-4 h-4 text-gov-gray-500 absolute left-2.5 top-2" />
          </form>

          {/* Connectivity Status Toggle */}
          <button
            onClick={toggleConnectivity}
            className={`flex items-center gap-1 text-xs px-2 py-1.5 rounded border transition-colors ${
              isOnline
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100'
            }`}
            title="Click to toggle Network Simulation (Online/Offline)"
          >
            {isOnline ? (
              <Wifi className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <WifiOff className="w-3.5 h-3.5 text-amber-600" />
            )}
            <span className="font-medium hidden sm:inline">
              {isOnline ? 'ONLINE' : 'OFFLINE'}
            </span>
          </button>

          {/* Offline Sync Pending Badge */}
          {pendingItems.length > 0 && (
            <button
              onClick={() => syncNow()}
              disabled={isSyncing || !isOnline}
              className="flex items-center gap-1 text-xs bg-gov-saffron text-white px-2 py-1.5 rounded hover:bg-[#c24615] transition-colors disabled:opacity-50"
              title={`${pendingItems.length} records stored locally. Click to Sync.`}
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span className="font-semibold">{pendingItems.length}</span>
              <span className="hidden md:inline">Sync</span>
            </button>
          )}

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
              className="p-1.5 rounded hover:bg-gov-gray-100 relative text-gov-gray-700 focus:outline-none focus:ring-1 focus:ring-gov-navy"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 text-gov-gray-600" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gov-emergency text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {notifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-gov-gray-300 rounded shadow-lg z-50 p-3 text-xs">
                <div className="flex items-center justify-between border-b border-gov-gray-200 pb-2 mb-2">
                  <span className="font-bold text-gov-navy">Official Alerts & Notices</span>
                  <button
                    onClick={markAllAsRead}
                    className="text-gov-navy hover:underline text-[11px]"
                  >
                    Mark all read
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-2 rounded border ${
                        notif.read ? 'bg-white border-gov-gray-200 text-gov-gray-600' : 'bg-gov-saffronLight border-gov-saffron/30 text-gov-gray-900 font-medium'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-semibold text-gov-navy">{notif.title}</span>
                        <span className="text-gov-gray-500">{notif.timestamp}</span>
                      </div>
                      <p className="mt-1 text-xs text-gov-gray-700">{notif.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Persona / Role Selector Dropdown */}
          {isAuthenticated ? (
            <div className="relative flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                  className="flex items-center gap-1.5 bg-gov-navy text-white text-xs px-2.5 py-1.5 rounded hover:bg-gov-navyLight transition-colors focus:outline-none focus:ring-2 focus:ring-gov-saffron"
                  aria-haspopup="true"
                  aria-expanded={roleDropdownOpen}
                >
                  <User className="w-3.5 h-3.5" />
                  <div className="text-left hidden sm:block">
                    <div className="text-[10px] text-slate-300 leading-tight">Persona:</div>
                    <div className="font-semibold leading-none">
                      {role === 'citizen' && t.roleCitizen}
                      {role === 'healthWorker' && t.roleHealthWorker}
                      {role === 'doctor' && t.roleDoctor}
                      {role === 'facility' && t.roleFacility}
                      {role === 'government' && t.roleGovt}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-80" />
                </button>

                {roleDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white border border-gov-gray-300 rounded shadow-xl z-50 p-2 text-xs">
                    <div className="px-2 py-1 text-[11px] font-bold text-gov-gray-500 uppercase border-b border-gov-gray-200 mb-1">
                      Switch Active Role
                    </div>
                    {[
                      { r: 'citizen', label: t.roleCitizen, desc: 'Ramesh Jadhav (Citizen/Patient)' },
                      { r: 'healthWorker', label: t.roleHealthWorker, desc: 'Sunita Tai (ASHA Worker)' },
                      { r: 'doctor', label: t.roleDoctor, desc: 'Dr. Ananya Patil (Civil Hospital)' },
                      { r: 'facility', label: t.roleFacility, desc: 'Civil Hospital Administration' },
                      { r: 'government', label: t.roleGovt, desc: 'Directorate of Health Services' },
                    ].map((item) => (
                      <button
                        key={item.r}
                        onClick={() => handleRoleSelect(item.r as UserRole)}
                        className={`w-full text-left px-2.5 py-2 rounded transition-colors flex items-start justify-between ${
                          role === item.r ? 'bg-gov-navy text-white' : 'hover:bg-gov-gray-100 text-gov-gray-800'
                        }`}
                      >
                        <div>
                          <div className="font-semibold">{item.label}</div>
                          <div className={`text-[11px] ${role === item.r ? 'text-slate-200' : 'text-gov-gray-500'}`}>
                            {item.desc}
                          </div>
                        </div>
                        {role === item.r && <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleLogout}
                className="text-xs font-semibold bg-white border border-gov-gray-300 text-gov-navy px-2.5 py-1.5 rounded hover:bg-gov-gray-50 transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 bg-gov-saffron hover:bg-[#c24615] text-white text-xs px-3 py-1.5 rounded font-bold transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              Login
            </Link>
          )}

        </div>

      </div>
    </header>
  );
};
