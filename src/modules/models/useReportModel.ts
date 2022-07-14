import { useState } from 'react';
import { reportRequest } from '@/modules/services';
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
    const response = await reportRequest.get('');
    updateMovies(response);
  };

  return {
    reports,
    getReports,
  };
};
