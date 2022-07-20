import { AxiosResponse } from 'axios';
import { format, getMonth } from 'date-fns';
import { ReportInterface } from 'request';

const dateFormat = (response: AxiosResponse | void) => {
  if (!response) return;

  const data = response.data.map((data: ReportInterface) => {
    const date = new Date(data.date);
    const yearMonthDate = format(date, 'yyyy년MM월dd일');
    const monthDate = format(date, 'MM월dd일');
    return { ...data, yearMonthDate, monthDate };
  });

  return data;
};

export default dateFormat;
