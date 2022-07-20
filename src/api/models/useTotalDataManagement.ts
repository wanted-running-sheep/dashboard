import { useState } from 'react';
import { TotalDataInterface, ApiDataType, CombineDataType } from 'request';
import { apiRequest } from '../instance';
import createWeeklyList from '@/utils/createWeeklyList';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';

export const useTotalDataManagement = () => {
  const [totalWeeklyChartData, setTotalWeeklyChartData] =
    useState<TotalDataInterface>({});

  const [selectedDate, setSelectedDate] = useState<string>('');

  const addTypeAndYearMonthDate = (
    response: AxiosResponse | void,
    dataType: ApiDataType
  ) => {
    if (!response) return;

    const data = response.data.map((data: CombineDataType) => {
      const date = new Date(data.date);
      const yearMonthDate = format(date, 'yyyy년MM월dd일');
      const monthDate = format(date, 'MM월dd일');
      return { ...data, yearMonthDate, monthDate, dataType };
    });

    return data;
  };

  const getTotalChartData = async () => {
    try {
      const [reportsResponse, mediaResponse] = await Promise.all([
        apiRequest.get('/report'),
        apiRequest.get('/media'),
      ]);

      const reports = addTypeAndYearMonthDate(reportsResponse, 'Report');
      const media = addTypeAndYearMonthDate(mediaResponse, 'Media');

      const weeklyList = createWeeklyList(reports, media);

      setTotalWeeklyChartData(weeklyList);
      setSelectedDate(Object.keys(weeklyList)[0]);
    } catch (error) {
      console.log(error);
      /* alert('데이터를 불러오는데 실패 하였습니다. 관리자에게 문의하세요'); */
    }
  };

  return {
    getTotalChartData,
    totalWeeklyChartData,
    selectedDate,
    setSelectedDate,
  };
};
