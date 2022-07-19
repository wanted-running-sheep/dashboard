import { useState } from 'react';
import { AdvertisementInterface } from 'request';
import { apiRequest } from '@/api/instance';
import { AxiosResponse } from 'axios';

export const useAdvertisementModel = () => {
  const [advertisements, setAdvertisements] = useState<
    AdvertisementInterface[]
  >([]);

  const updateAdvertisements = (response: AxiosResponse | void) => {
    if (response) {
      setAdvertisements(response.data);
    }
  };

  const postAdvertisement = async (data: AdvertisementInterface) => {
    try {
      await apiRequest.post('/advertisements', data);
      getAdvertisements();
    } catch (error) {
      console.log(error);
    }
  };

  const getAdvertisements = async () => {
    const response = await apiRequest.get('/advertisements');
    updateAdvertisements(response);
  };

  return {
    advertisements,
    getAdvertisements,
    postAdvertisement,
  };
};
