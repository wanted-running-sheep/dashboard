import dateFormat from '@/utils/dateFormat';
import { useState } from 'react';
import { TotalDataManagementInterface } from 'request';
import { apiRequest } from '../instance';
import createWeekList from '@/utils/createWeekList';
import createWeeklyList from '@/utils/createWeeklyList';

export const useTotalDataManagement = () => {
  const [totalData, setTotalData] = useState<TotalDataManagementInterface>({
    reports: [],
    media: [],
  });
  const [weekList, setWeekList] = useState<string[]>([]);

  const getTotalData = async () => {
    try {
      const [reportsResponse, mediaResponse] = await Promise.all([
        apiRequest.get('/report'),
        apiRequest.get('/media'),
      ]);

      const reportsFormattedData = dateFormat(reportsResponse);
      const MediaFormattedData = dateFormat(mediaResponse);

      setTotalData({
        reports: reportsFormattedData,
        media: MediaFormattedData,
      });

      console.log(createWeeklyList(reportsFormattedData, MediaFormattedData));
      setWeekList(createWeekList(reportsFormattedData, MediaFormattedData));
    } catch (error) {
      console.log(error);
      /* alert('데이터를 불러오는데 실패 하였습니다. 관리자에게 문의하세요'); */
    }
  };

  return {
    totalData,
    getTotalData,
    weekList,
  };
};
