import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { HomePage } from '../pages/home/HomePage';
import { HospitalProfilePage } from '../pages/hospitals/HospitalProfilePage';
import { ProgramDetailPage } from '../pages/programs/ProgramDetailPage';
import { EligibilityWizardPage } from '../pages/eligibility/EligibilityWizardPage';
import { ApplyPage } from '../pages/applications/ApplyPage';
import { ApplicationsDashboardPage } from '../pages/applications/ApplicationsDashboardPage';
import { ApplicationDetailPage } from '../pages/applications/ApplicationDetailPage';
import { SavedProgramsPage } from '../pages/saved/SavedProgramsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';
import { ProviderPortalPage } from '../pages/portal/ProviderPortalPage';
import { MessagesPage } from '../pages/messages/MessagesPage';
import { ConversationPage } from '../pages/messages/ConversationPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Main 5 Tabs */}
        <Route path="/" element={<HomePage />} />
        <Route path="/eligibility" element={<EligibilityWizardPage />} />
        <Route path="/applications" element={<ApplicationsDashboardPage />} />
        <Route path="/saved" element={<SavedProgramsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Messaging Sub-flows */}
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/messages/:id" element={<ConversationPage />} />

        {/* Inner Detail & Sub-flows */}
        <Route path="/hospitals/:id" element={<HospitalProfilePage />} />
        <Route path="/programs/:id" element={<ProgramDetailPage />} />
        <Route path="/apply/:programId" element={<ApplyPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailPage />} />

        {/* Staff Management Portal */}
        <Route path="/portal/manage" element={<ProviderPortalPage />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
