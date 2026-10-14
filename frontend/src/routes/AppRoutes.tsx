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
import { AppointmentPage } from '../pages/AppointmentPage';
import { EmergencyPage } from '../pages/EmergencyPage';
import { LoginPage } from '../pages/LoginPage';
import { AdminPage } from '../pages/AdminPage';

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
      <Route path="/appointment" element={<AppointmentPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
