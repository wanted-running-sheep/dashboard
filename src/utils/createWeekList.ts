import {
  format,
  previousMonday,
  nextSunday,
  isMonday,
  isSunday,
} from 'date-fns';
import { ReportInterface, MediaInterface } from 'request';

const KOREAN_DATE_FORMAT = 'yyyy년MM월dd일';

const getStartDateOfWeek = (date: string) => {
  let dataFns = new Date(date);
  let startDate = '';
  if (isMonday(dataFns)) {
    startDate = format(new Date(date), KOREAN_DATE_FORMAT);
  } else {
    startDate = format(previousMonday(new Date(date)), KOREAN_DATE_FORMAT);
  }
  return startDate;
};

const getEndDateOfWeek = (date: string) => {
  let dataFns = new Date(date);
  let endDate = '';
  if (isSunday(dataFns)) {
    endDate = format(new Date(date), KOREAN_DATE_FORMAT);
  } else {
    endDate = format(nextSunday(new Date(date)), KOREAN_DATE_FORMAT);
  }
  return endDate;
};

const makeWeekList = (date: string, weekArray: Array<string>) => {
  const startDateOfWeek = getStartDateOfWeek(date);
  const endDateOfWeek = getEndDateOfWeek(date);
  const periodOfWeek = `${startDateOfWeek} ~ ${endDateOfWeek}`;

  if (!weekArray.includes(periodOfWeek)) {
    weekArray.push(periodOfWeek);
  }
};

const createWeekList = (
  reportData: ReportInterface[],
  mediaData: MediaInterface[]
) => {
  const weekArray: string[] = [];

  reportData.map((report) => {
    makeWeekList(report.date, weekArray);
  });

  mediaData.map((media) => {
    makeWeekList(media.date, weekArray);
  });

  return weekArray;
};

export default createWeekList;
