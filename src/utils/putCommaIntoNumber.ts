interface PutCommaIntoNumberProps {
  number: number;
  decimalPoint?: number;
  unit?: string;
}

const putCommaIntoNumber = ({
  number,
  decimalPoint = 0,
  unit = '',
}: PutCommaIntoNumberProps): string => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  const floatNumber = parseFloat(number.toFixed(decimalPoint)) + '';
  return `${floatNumber.replace(regex, ',')}${unit}`;
};

export default putCommaIntoNumber;
