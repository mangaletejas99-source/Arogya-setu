import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAccessibility } from '../../context/AccessibilityContext';
import { useAuth } from '../../context/AuthContext';
import { Menu, X, LayoutDashboard, ExternalLink } from 'lucide-react';

export const Navigation: React.FC = () => {
  const { t } = useAccessibility();
  const { role, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getDashboardPath = () => {
    switch (role) {
      case 'citizen': return '/citizen/dashboard';
      case 'doctor': return '/doctor/dashboard';
      case 'healthWorker': return '/health-worker/dashboard';
      case 'facility': return '/facility/dashboard';
      case 'government': return '/government/dashboard';
      default: return '/login';
    }
  };

  const navLinks = [
    { name: t.navHome, path: '/' },
    { name: t.navAbout, path: '/about' },
    { name: t.navServices, path: '/services' },
    { name: t.navFacilities, path: '/facilities' },
    { name: t.navSchemes, path: '/schemes' },
    { name: t.navNotices, path: '/notices' },
    { name: t.navGrievance, path: '/grievance' },
    { name: t.navHelp, path: '/help' },
  ];

  return (
    <nav className="bg-gov-navy text-white text-sm font-medium sticky top-0 z-40 shadow-sm border-b-2 border-gov-saffron">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
        
        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `px-3 py-2.5 transition-colors border-b-2 ${
                  isActive
                    ? 'border-gov-saffron bg-gov-navyDark text-white font-semibold'
                    : 'border-transparent text-slate-200 hover:text-white hover:bg-gov-navyLight'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Right: Direct My Workspace Link */}
        <div className="hidden lg:flex items-center">
          <Link
            to={isAuthenticated ? getDashboardPath() : '/login'}
            className="flex items-center gap-1.5 bg-gov-saffron hover:bg-[#c24615] text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>{isAuthenticated ? `Active Portal (${role})` : 'Login'}</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="lg:hidden flex items-center justify-between w-full py-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Arogya Setu Public Navigation
          </span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded text-white hover:bg-gov-navyLight focus:outline-none focus:ring-1 focus:ring-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-gov-navyDark border-t border-slate-700 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm ${
                  isActive
                    ? 'bg-gov-saffron text-white font-semibold'
                    : 'text-slate-200 hover:bg-gov-navy'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="pt-2 border-t border-slate-700">
            <Link
              to={isAuthenticated ? getDashboardPath() : '/login'}
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center bg-gov-saffron text-white py-2 rounded font-semibold text-xs"
            >
              {isAuthenticated ? `Go to Active Portal (${role})` : 'Login'}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
