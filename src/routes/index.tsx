import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { DashboardPage, ManagementPage } from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate replace to="/dashboard" />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/management" element={<ManagementPage />} />
    </Routes>
  );
};

export default Router;
