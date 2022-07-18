import React, { ReactNode } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import BarChartIcon from '@mui/icons-material/BarChart';

import Layout from '@/components/Layout';
import { DashboardPage, ManagementPage } from '@/pages';

export const navigationList = [
  {
    Icon: () => <QueryStatsIcon />,
    element: <DashboardPage />,
    title: '대시보드',
    path: '/dashboard',
  },
  {
    Icon: () => <BarChartIcon />,
    element: <ManagementPage />,
    title: '광고관리',
    path: '/management',
  },
];

const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate replace to="/dashboard" />} />
        {navigationList.map(({ title, path, element }) => (
          <Route key={title} path={path} element={element} />
        ))}
        <Route path="*" element={<Navigate replace to="/dashboard" />} />
      </Route>
    </Routes>
  );
};

export default Router;
