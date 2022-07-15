import React, { useEffect } from 'react';
import Report from '@/components/Report';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';
import styled from 'styled-components';

const DashboardPage = () => {
  const {
    totalData: { reports },
    getTotalData,
  } = useTotalDataManagement();

  useEffect(() => {
    getTotalData();
  }, []);

  return <Report data={reports} />;
};

export default DashboardPage;
