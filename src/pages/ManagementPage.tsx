import React, { useEffect } from 'react';
import Title from '@/components/Layout/Title';
import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import Management from '@/components/Management';

const ManagementPage = () => {
  const { advertisements, getAdvertisements } = useAdvertisementModel();

  useEffect(() => {
    getAdvertisements();
  }, []);

  if (!advertisements.length) return null;

  return (
    <>
      <Title />
      <Management advertisements={advertisements} />
    </>
  );
};

export default ManagementPage;
