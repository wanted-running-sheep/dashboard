import { MANAGEMENT_INPUT_TITLE, MANAGEMENT_STATUS } from '@/constants/index';
import { AdvertisementDataType } from 'request';
import getCommaLocalString from './getCommaLocalString';

type DefaultObjType = { [key: string]: string | number };
export type InputType = 'text' | 'number';

export const checkNumberVale = (inputName: string) => {
  return (
    inputName === 'budget' ||
    inputName === 'roas' ||
    inputName === 'convValue' ||
    inputName === 'cost'
  );
};

interface MakeViewDataParams {
  inputName: string;
  advertisement: DefaultObjType | undefined;
  isReadOnly: boolean;
  requestValue: AdvertisementDataType;
  isNewForm: boolean;
}

const makeViewData = ({
  inputName,
  advertisement,
  isReadOnly,
  requestValue,
  isNewForm,
}: MakeViewDataParams) => {
  let title = MANAGEMENT_INPUT_TITLE[inputName];
  //let value = advertisement && advertisement[inputName];\
  let value: string | number = requestValue[inputName];
  let onlyNumber: boolean = false;

  /* if (isReadOnly && advertisement) {
    value = advertisement[inputName];
  } else if (!isReadOnly && advertisement) {
    value = requestValue[inputName];
  } */

  if (checkNumberVale(inputName) && value && isReadOnly && !isNewForm) {
    value = Number(value);
    onlyNumber = true;
  }

  if (inputName === 'status') {
    value = MANAGEMENT_STATUS[value];
  }

  if (typeof value === 'number' && value > 10000 && inputName !== 'roas') {
    value = `${getCommaLocalString(Math.round(value / 10000))} 만원`;
  }

  if (typeof value === 'number' && value < 10000 && inputName !== 'roas') {
    value = `${getCommaLocalString(Math.round(value))} 원`;
  }

  if (typeof value === 'number' && inputName === 'roas') {
    value = `${getCommaLocalString(value)} %`;
  }

  return { title, value, onlyNumber };
};

export default makeViewData;
