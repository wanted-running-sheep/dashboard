import { useState } from 'react';
import { mediaRequest } from '../services';
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
    const response = await mediaRequest.get('');
    updateMedia(response);
  };

  return {
    media,
    getMedia,
  };
};
