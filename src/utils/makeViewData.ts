import { MANAGEMENT_INPUT_TITLE } from '@/constants/index';
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

const makeViewData = (
  inputName: string,
  advertisement: DefaultObjType | undefined
) => {
  let title = MANAGEMENT_INPUT_TITLE[inputName];
  let value = advertisement && advertisement[inputName];
  let onlyNumber: boolean = false;

  if (checkNumberVale(inputName) && value) {
    value = Number(value);
    onlyNumber = true;
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
