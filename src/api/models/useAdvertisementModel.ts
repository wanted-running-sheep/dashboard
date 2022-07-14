import { useState } from 'react';
import { AdvertisementProps } from 'request';
import { apiRequest } from '@/api/instance';
import { AxiosResponse } from 'axios';

export const useAdvertisementModel = () => {
  const [advertisements, setAdvertisements] = useState<AdvertisementProps[]>(
    []
  );

  const updateAdvertisements = (response: AxiosResponse | void) => {
    if (response) {
      setAdvertisements(response.data);
    }
  };
  const getAdvertisements = async () => {
    const response = await apiRequest.get('/advertisements');
    updateAdvertisements(response);
  };

  return {
    advertisements,
    getAdvertisements,
  };
};
