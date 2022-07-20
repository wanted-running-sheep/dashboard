import putCommaIntoNumber from './putCommaIntoNumber';

const formatMoney = (value: number) => {
  const length = value.toFixed(0).length;
  const initNumberFormat = {
    number: value,
    decimalPoint: 0,
    unit: '',
  };
  let formattedValue = '';

  if (length < 5) {
    // 1 단위
    formattedValue = putCommaIntoNumber({ ...initNumberFormat });
  } else if (length < 9) {
    // 만 단위
    formattedValue = putCommaIntoNumber({
      ...initNumberFormat,
      number: value / 10 ** 4,
      unit: '만',
    });
  } else {
    // 억 단위
    formattedValue = putCommaIntoNumber({
      ...initNumberFormat,
      number: value / 10 ** 8,
      decimalPoint: 1,
      unit: '억',
    });
  }

  return formattedValue;
};

export default formatMoney;
