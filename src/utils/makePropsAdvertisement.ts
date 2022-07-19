import { MANAGEMENT_STATUS } from '@/constants';
import { format } from 'date-fns';
import { AdvertisementInterface } from 'request';

const makePropsAdvertisement = (advertisement: AdvertisementInterface) => {
  const DATE_FORMAT = 'yyyy-MM-dd';
  const startDate = format(new Date(advertisement.startDate), DATE_FORMAT);

  return {
    id: advertisement.id,
    title: advertisement.title,
    status: advertisement.status,
    startDate,
    budget: advertisement.budget,
    roas: advertisement.report.roas,
    convValue: advertisement.report.convValue,
    cost: advertisement.report.cost,
  };
};

export default makePropsAdvertisement;
