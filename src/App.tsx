import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AccessibilityProvider } from './context/AccessibilityContext';
import { AuthProvider } from './context/AuthContext';
import { OfflineProvider } from './context/OfflineContext';
import { NotificationProvider } from './context/NotificationContext';

// Layouts
import { PublicLayout } from './components/layout/PublicLayout';
import { PortalLayout } from './components/layout/PortalLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { AboutPage } from './pages/public/AboutPage';
import { ServicesPage } from './pages/public/ServicesPage';
import { FacilitiesPage } from './pages/public/FacilitiesPage';
import { SchemesPage } from './pages/public/SchemesPage';
import { NoticesPage } from './pages/public/NoticesPage';
import { GrievancePage } from './pages/public/GrievancePage';
import { HelpContactPage } from './pages/public/HelpContactPage';
import { AccessibilityPage } from './pages/public/AccessibilityPage';
import { LoginPage } from './pages/public/LoginPage';

// Citizen Pages
import { CitizenDashboard } from './pages/citizen/CitizenDashboard';
import { HealthRecordsView } from './pages/citizen/HealthRecordsView';
import { AppointmentsView } from './pages/citizen/AppointmentsView';
import { QueueStatusView } from './pages/citizen/QueueStatusView';
import { TriageView } from './pages/citizen/TriageView';
import { TeleconsultationView } from './pages/citizen/TeleconsultationView';
import { ReferralStatusView } from './pages/citizen/ReferralStatusView';
import { DiagnosticsView } from './pages/citizen/DiagnosticsView';
import { MedicinesView } from './pages/citizen/MedicinesView';
import { EmergencyView } from './pages/citizen/EmergencyView';
import { AssistantView } from './pages/citizen/AssistantView';

// Doctor Pages
import { DoctorDashboard } from './pages/doctor/DoctorDashboard';
import { ClinicalQueueView } from './pages/doctor/ClinicalQueueView';
import { ReferralOutView } from './pages/doctor/ReferralOutView';

// Health Worker Pages
import { HealthWorkerDashboard } from './pages/healthWorker/HealthWorkerDashboard';
import { HighRiskFollowUpView } from './pages/healthWorker/HighRiskFollowUpView';
import { OfflineSyncView } from './pages/healthWorker/OfflineSyncView';

// Facility Pages
import { FacilityDashboard } from './pages/facility/FacilityDashboard';

// Government Pages
import { GovernmentDashboard } from './pages/government/GovernmentDashboard';

export const App: React.FC = () => {
  return (
    <AccessibilityProvider>
      <AuthProvider>
        <OfflineProvider>
          <NotificationProvider>
            <BrowserRouter>
              <Routes>
                {/* Public Portal Routes */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/facilities" element={<FacilitiesPage />} />
                  <Route path="/schemes" element={<SchemesPage />} />
                  <Route path="/notices" element={<NoticesPage />} />
                  <Route path="/grievance" element={<GrievancePage />} />
                  <Route path="/help" element={<HelpContactPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Authenticated Dashboard / Workstation Routes */}
                <Route element={<PortalLayout />}>
                  {/* Citizen Routes */}
                  <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
                  <Route path="/citizen/records" element={<HealthRecordsView />} />
                  <Route path="/citizen/appointments" element={<AppointmentsView />} />
                  <Route path="/citizen/queue" element={<QueueStatusView />} />
                  <Route path="/citizen/triage" element={<TriageView />} />
                  <Route path="/citizen/teleconsultation" element={<TeleconsultationView />} />
                  <Route path="/citizen/referrals" element={<ReferralStatusView />} />
                  <Route path="/citizen/diagnostics" element={<DiagnosticsView />} />
                  <Route path="/citizen/medicines" element={<MedicinesView />} />
                  <Route path="/citizen/schemes" element={<SchemesPage />} />
                  <Route path="/citizen/follow-up" element={<HighRiskFollowUpView />} />
                  <Route path="/citizen/emergency" element={<EmergencyView />} />
                  <Route path="/citizen/assistant" element={<AssistantView />} />

                  {/* Doctor Routes */}
                  <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                  <Route path="/hospital/dashboard" element={<DoctorDashboard />} />
                  <Route path="/hospital/queue" element={<ClinicalQueueView />} />
                  <Route path="/hospital/appointments" element={<AppointmentsView />} />
                  <Route path="/hospital/referrals" element={<ReferralOutView />} />
                  <Route path="/doctor/patients" element={<DoctorDashboard />} />
                  <Route path="/doctor/appointments" element={<AppointmentsView />} />
                  <Route path="/doctor/queue" element={<ClinicalQueueView />} />
                  <Route path="/doctor/triage" element={<TriageView />} />
                  <Route path="/doctor/teleconsultation" element={<TeleconsultationView />} />
                  <Route path="/doctor/prescriptions" element={<DoctorDashboard />} />
                  <Route path="/doctor/diagnostics" element={<DiagnosticsView />} />
                  <Route path="/doctor/referrals" element={<ReferralOutView />} />
                  <Route path="/doctor/follow-up" element={<HighRiskFollowUpView />} />

                  {/* Health Worker Routes */}
                  <Route path="/health-worker/dashboard" element={<HealthWorkerDashboard />} />
                  <Route path="/health-worker/patients" element={<HealthWorkerDashboard />} />
                  <Route path="/health-worker/follow-ups" element={<HighRiskFollowUpView />} />
                  <Route path="/health-worker/referrals" element={<ReferralStatusView />} />
                  <Route path="/health-worker/teleconsultation" element={<TeleconsultationView />} />
                  <Route path="/health-worker/offline" element={<OfflineSyncView />} />

                  {/* Facility / Hospital Routes */}
                  <Route path="/facility/dashboard" element={<FacilityDashboard />} />
                  <Route path="/facility/queue" element={<ClinicalQueueView />} />
                  <Route path="/facility/referrals" element={<ReferralStatusView />} />
                  <Route path="/facility/medicines" element={<MedicinesView />} />
                  <Route path="/facility/diagnostics" element={<DiagnosticsView />} />
                  <Route path="/facility/follow-up" element={<HighRiskFollowUpView />} />

                  {/* Government Health Administration Routes */}
                  <Route path="/government/dashboard" element={<GovernmentDashboard />} />
                  <Route path="/government/facilities" element={<FacilitiesPage />} />
                  <Route path="/government/referrals" element={<ReferralStatusView />} />
                  <Route path="/government/medicines" element={<MedicinesView />} />
                  <Route path="/government/diagnostics" element={<DiagnosticsView />} />
                  <Route path="/government/analytics" element={<GovernmentDashboard />} />
                  <Route path="/government/disease" element={<GovernmentDashboard />} />
                  <Route path="/government/performance" element={<GovernmentDashboard />} />
                </Route>

                {/* Catch-all fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </NotificationProvider>
        </OfflineProvider>
      </AuthProvider>
    </AccessibilityProvider>
  );
};

export default App;
