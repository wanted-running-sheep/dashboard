import { format } from 'date-fns';
import { AdvertisementWithoutIdType } from 'request';

const setPostReqVal = (reqData: { [key: string]: string | number }) => {
  const postReqVal: AdvertisementWithoutIdType = {
    adType: 'web',
    title: reqData.title as string,
    budget: reqData.budget as number,
    status: reqData.status as string,
    startDate: format(new Date(reqData.startDate), 'yyyy-MM-dd'),
    endDate: '2022-08-01',
    report: {
      cost: reqData.cost as number,
      convValue: reqData.convValue as number,
      roas: reqData.roas as number,
    },
  };

  return postReqVal;
};

export default setPostReqVal;
