import { useState } from 'react';
import { apiRequest } from '@/api/instance';
import { AxiosResponse } from 'axios';
import { ReportInterface } from 'request';
import dateFormat from '@/utils/dateFormat';
export const useReportModel = () => {
  const [reports, setReports] = useState<ReportInterface[]>([]);

  const getReports = async () => {
    const response = await apiRequest.get('/report');
    const formattedData = dateFormat(response);
    setReports(formattedData);
  };

  const getWeekReports = async (startDate: string, endDate: string) => {
    const response = await apiRequest.get(
      '/report',
      `date_gte=${startDate}&date_lte=${endDate}`
    );
    setReports(dateFormat(response));
  };

  return {
    reports,
    getReports,
    getWeekReports,
  };
};
