import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';

import Dropdown from '@/components/Dropdown';
import Title from '@/components/Layout/Title';
import AdvertisingStatus from '@/components/AdvertisingStatus';
import MediaStatus from '@/components/MediaStatus';

const DashboardPage = () => {
  const {
    totalData: { reports },
    getTotalData,
  } = useTotalDataManagement();

  useEffect(() => {
    getTotalData();
  }, []);

  return (
    <>
      <Title>
        <Dropdown />
      </Title>
      <AdvertisingStatus data={reports} />
      <MediaStatus />
    </>
  );
};

export default DashboardPage;
