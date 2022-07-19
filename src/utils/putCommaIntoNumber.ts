interface PutCommaIntoNumberProps {
  number: number;
  decimalPoint: number;
  unit: string;
}

const putCommaIntoNumber = ({
  number,
  decimalPoint = 0,
  unit = '',
}: PutCommaIntoNumberProps): string => {
  const regex = /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g;
  return `${number.toFixed(decimalPoint).replace(regex, ',')}${unit}`;
};

export default putCommaIntoNumber;
