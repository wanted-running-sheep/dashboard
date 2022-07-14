import { useState } from 'react';
import { apiRequest } from '@/api/instance';
import { AxiosResponse } from 'axios';
import { MediaProps } from 'request';

export const useMediaModel = () => {
  const [media, setMedia] = useState<MediaProps[]>([]);

  const updateMedia = (response: AxiosResponse | void) => {
    if (response) {
      setMedia(response.data);
    }
  };

  const getMedia = async () => {
    const response = await apiRequest.get('/media');
    updateMedia(response);
  };

  return {
    media,
    getMedia,
  };
};
