import { MANAGEMENT_INPUT_TITLE } from '@/constants';

const adsFormValidate = (reqVal: { [key: string]: string | Number }) => {
  for (const key of Object.keys(MANAGEMENT_INPUT_TITLE)) {
    if (!reqVal[key]) {
      return {
        notValidationTitle: MANAGEMENT_INPUT_TITLE[key],
        validation: false,
      };
    }
  }

  return {
    notValidationTitle: null,
    validation: true,
  };
};

export default adsFormValidate;
