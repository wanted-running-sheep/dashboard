import { AdvertisementInterface } from 'request';

const getNewId = (ads: AdvertisementInterface[] = []) => {
  const id = Math.max(...ads.map((ad) => ad.id));

  return id + 1;
};

export default getNewId;
