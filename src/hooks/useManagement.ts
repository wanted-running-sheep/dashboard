import { useAdvertisementModel } from '@/api/models/useAdvertisementModel';
import { DEFAULT_DATE_FORMAT } from '@/constants';
import { format } from 'date-fns';
import { FormEvent, useState } from 'react';
import { AdvertisementDataType, AdvertisementUpdateDataType } from 'request';

const useManagement = (advertisement?: AdvertisementDataType) => {
  const isNewForm = !advertisement;
  const { postAdvertisement, patchAdvertisements, getAdvertisements } =
    useAdvertisementModel();
  const [isReadOnly, setIsReadOnly] = useState<boolean>(true);
  const [requestValue, setRequestValue] = useState<AdvertisementDataType>({
    ...advertisement,
    status: isNewForm ? 'active' : advertisement.status,
    startDate: isNewForm
      ? format(new Date(), DEFAULT_DATE_FORMAT)
      : advertisement.startDate,
  });

  const getNumberWithoutPercent = (strValue: string | number): number => {
    return Number(String(strValue).split(' ')[0]);
  };

  const createReqData = () => {
    const requestData: AdvertisementUpdateDataType = {
      id: requestValue.id as number,
      title: requestValue.title as string,
      status: requestValue.status as string,
      budget: requestValue.budget as number,
      startDate: requestValue.startDate as string,
      report: {
        cost: requestValue.cost as number,
        convValue: requestValue.convValue as number,
        roas: getNumberWithoutPercent(requestValue.roas),
      },
    };

    return requestData;
  };

  return {
    isNewForm,
    postAdvertisement,
    patchAdvertisements,
    requestValue,
    setRequestValue,
    setIsReadOnly,
    isReadOnly,
    createReqData,
    getAdvertisements,
  };
};

export default useManagement;
