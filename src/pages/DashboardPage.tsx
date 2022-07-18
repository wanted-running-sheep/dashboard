import React, { useEffect } from 'react';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';

import Dropdown from '@/components/Dropdown';
import Title from '@/components/Layout/Title';
import AdvertisingStatus from '@/components/AdvertisingStatus';
import MediaStatus from '@/components/MediaStatus';

const DashboardPage = () => {
  const { totalWeeklyData, selectedDate, setSelectedDate, getTotalData } =
    useTotalDataManagement();

  const getSpecificWeekData = (datesOfWeek: string) => {
    setSelectedDate(datesOfWeek);
  };

  useEffect(() => {
    getTotalData();
  }, []);

  if (!totalWeeklyData[selectedDate]) return null;

  return (
    <>
      <Title>
        <Dropdown
          getSpecificWeekData={getSpecificWeekData}
          weekList={Object.keys(totalWeeklyData)}
        />
      </Title>
      <AdvertisingStatus data={totalWeeklyData[selectedDate].reports} />
      <MediaStatus />
    </>
  );
};

export default DashboardPage;
