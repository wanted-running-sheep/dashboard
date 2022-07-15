import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { DashboardPage, ManagementPage, DrawerTest } from '@/pages';

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/management" element={<ManagementPage />} />
      </Route>
      <Route path="/drawerTest" element={<DrawerTest />} />
    </Routes>
  );
};

export default Router;
