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

  const onChangeSelectedDate = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
  };

  useEffect(() => {
    console.log('dashboard render');
    getTotalChartData();
  }, []);

  if (!totalWeeklyChartData[selectedDate]) return null;

  return (
    <>
      <Title>
        <Dropdown
          onChange={onChangeSelectedDate}
          dataList={Object.keys(totalWeeklyChartData)}
        />
      </Title>

      <AdvertisingStatus data={totalWeeklyChartData[selectedDate].reports} />
      <MediaStatus data={totalWeeklyChartData[selectedDate].media} />
    </>
  );
};

export default DashboardPage;
