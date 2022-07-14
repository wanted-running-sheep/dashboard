import { useState } from 'react';
import { AdvertisementProps } from 'request';
import { advertisementRequest } from '../services';
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
    const response = await advertisementRequest.get('');
    updateAdvertisements(response);
  };

  return {
    advertisements,
    getAdvertisements,
  };
};
