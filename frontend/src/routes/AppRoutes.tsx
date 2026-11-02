import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { DepartmentsPage } from '../pages/DepartmentsPage';
import { DoctorsPage } from '../pages/DoctorsPage';
import { NewsPage } from '../pages/NewsPage';
import { NewsArticlePage } from '../pages/announcement';
import { AnnouncementPageTwo } from '../pages/announcement2';
import { AnnouncementPageThree } from '../pages/announcement3';
import { AnnouncementPageFour } from '../pages/announcement4';
import { AnnouncementPageFive } from '../pages/announcement5';
import { PartnershipsPage } from '../pages/PartnershipsPage';
import { EmergencyDeptPage } from '../pages/Emergency';
import { OncologyPage } from '../pages/oncology1';
import { GynecologicPage } from '../pages/Gynecologic1';
import { SurgeryPage } from '../pages/surgery1';
import { OutpatientPage } from '../pages/Outpatien1';
import { MedicalImagingPage } from '../pages/Medical';
import { LaboratoryPage } from '../pages/Laboratory';
import { AnatomicalPathologyPage } from '../pages/Anatomical';
import { EndoscopyPage } from '../pages/Endoscopy';
import { ICUPage } from '../pages/Icu';
import { PharmacyPage } from '../pages/Pharmacy';
import { SocialServicesPage } from '../pages/nssf';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/departments" element={<DepartmentsPage />} />
      <Route path="/doctors" element={<DoctorsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:slug" element={<NewsArticlePage />} />
      <Route path="/announcements" element={<NewsArticlePage />} />
      <Route path="/announcements2" element={<AnnouncementPageTwo />} />
      <Route path="/announcements3" element={<AnnouncementPageThree />} />
      <Route path="/announcements4" element={<AnnouncementPageFour />} />
      <Route path="/announcements5" element={<AnnouncementPageFive />} />
      <Route path="/new" element={<NewsArticlePage />} />
      <Route path="/partnerships" element={<PartnershipsPage />} />
      <Route path="/emergency" element={<EmergencyDeptPage />} />
      <Route path="/oncology" element={<OncologyPage />} />
      <Route path="/gynecologic" element={<GynecologicPage />} />
      <Route path="/surgery" element={<SurgeryPage />} />
      <Route path="/opd" element={<OutpatientPage />} />
      <Route path="/radiology" element={<MedicalImagingPage />} />
      <Route path="/laboratory" element={<LaboratoryPage />} />
      <Route path="/pathology" element={<AnatomicalPathologyPage />} />
      <Route path="/endoscopy" element={<EndoscopyPage />} />
      <Route path="/icu" element={<ICUPage />} />
      <Route path="/pharmacy" element={<PharmacyPage />} />
      <Route path="/social-services" element={<SocialServicesPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
