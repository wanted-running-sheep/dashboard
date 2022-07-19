import React, { useEffect } from 'react';
import { useTotalDataManagement } from '@/api/models/useTotalDataManagement';

import Dropdown from '@/components/Dropdown';
import Title from '@/components/Layout/Title';
import AdvertisingStatus from '@/components/AdvertisingStatus';
import MediaStatus from '@/components/MediaStatus';

const DashboardPage = () => {
  const {
    totalWeeklyChartData,
    selectedDate,
    setSelectedDate,
    getTotalChartData,
  } = useTotalDataManagement();

  const getSpecificWeekData = (datesOfWeek: string) => {
    setSelectedDate(datesOfWeek);
  };

  useEffect(() => {
    getTotalChartData();
  }, []);

  if (!totalWeeklyChartData[selectedDate]) return null;

  return (
    <>
      <Title>
        <Dropdown
          getSpecificWeekData={getSpecificWeekData}
          weekList={Object.keys(totalWeeklyChartData)}
        />
      </Title>
      
      <AdvertisingStatus data={totalWeeklyData[selectedDate].reports} />
      <MediaStatus data={totalWeeklyData[selectedDate].media} />
    </>
  );
};

export default DashboardPage;
