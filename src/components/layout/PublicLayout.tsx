import React from 'react';
import { Outlet } from 'react-router-dom';
import { UtilityBar } from './UtilityBar';
import { GovernmentHeader } from './GovernmentHeader';
import { Navigation } from './Navigation';
import { NoticeBar } from './NoticeBar';
import { Breadcrumbs } from './Breadcrumbs';
import { Footer } from './Footer';

export const PublicLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-gov-gray-900">
      <UtilityBar />
      <GovernmentHeader />
      <Navigation />
      <NoticeBar />
      <Breadcrumbs />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
