import { useState } from 'react';
import { apiRequest } from '@/api/instance';
import { AxiosResponse } from 'axios';
import { ReportProps } from 'request';
export const useReportModel = () => {
  const [reports, setReports] = useState<ReportProps[]>([]);

  const updateMovies = (response: AxiosResponse | void) => {
    if (response) {
      setReports(response.data);
    }
  };

  const getReports = async () => {
    const response = await apiRequest.get('/report');
    updateMovies(response);
  };

  return {
    reports,
    getReports,
  };
};
