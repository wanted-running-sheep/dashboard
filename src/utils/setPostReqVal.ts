import { format } from 'date-fns';
import { AdvertisementInterface } from 'request';

const setPostReqVal = (
  reqData: { [key: string]: string | number },
  newId: number
) => {
  const postReqVal: AdvertisementInterface = {
    id: newId,
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
