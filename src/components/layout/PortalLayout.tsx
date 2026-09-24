import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { UtilityBar } from './UtilityBar';
import { GovernmentHeader } from './GovernmentHeader';
import { Navigation } from './Navigation';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';
import { RoleSidebar } from './RoleSidebar';
import { useAuth, UserRole } from '../../context/AuthContext';

const protectedRoutes: Record<string, UserRole> = {
  '/citizen/': 'citizen',
  '/doctor/': 'doctor',
  '/hospital/': 'doctor',
  '/health-worker/': 'healthWorker',
  '/facility/': 'facility',
  '/government/': 'government',
};

export const PortalLayout: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, role } = useAuth();

  const matchingRoute = Object.entries(protectedRoutes).find(([path]) => location.pathname.startsWith(path));
  const requiredRole = matchingRoute?.[1];

  if (requiredRole && (!isAuthenticated || role !== requiredRole)) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gov-gray-900">
      <UtilityBar />
      <GovernmentHeader />
      <Navigation />
      <Breadcrumbs />
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <RoleSidebar />
        <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none min-w-0">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};
