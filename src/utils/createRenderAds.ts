import { AdvertisementInterface, AdvertismentStatusType } from 'request';

const createRenderAds = (
  advertisements: AdvertisementInterface[],
  filter: AdvertismentStatusType
) => {
  let ads: AdvertisementInterface[] = advertisements;

  if (filter === 'active' || filter === 'ended') {
    ads = advertisements.filter(
      (advertisement) => advertisement.status === filter
    );
  }

  return ads;
};

export default createRenderAds;
