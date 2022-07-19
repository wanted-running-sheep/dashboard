import { MANAGEMENT_INPUT_TITLE } from '@/constants';

const adsFormValidate = (reqVal: { [key: string]: string }) => {
  for (const [key, val] of Object.entries(reqVal)) {
    if (!val) {
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
