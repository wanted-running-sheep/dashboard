import dateFormat from '@/utils/dateFormat';
import { useState } from 'react';
import { TotalDataManagementInterface } from 'request';
import { apiRequest } from '../instance';
import createWeekList from '@/utils/createWeekList';

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

      const reportsData = dateFormat(reportsResponse);
      const mediaData = dateFormat(mediaResponse);

      setTotalData({
        reports: reportsData,
        media: mediaData,
      });
      setWeekList(createWeekList(reportsData, mediaData));
    } catch (error) {
      console.log(error);
      alert('데이터를 불러오는데 실패 하였습니다. 관리자에게 문의하세요');
    }
  };

  return {
    totalData,
    getTotalData,
    weekList,
  };
};
