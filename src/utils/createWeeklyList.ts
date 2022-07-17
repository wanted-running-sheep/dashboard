import {
  format,
  isMonday,
  previousMonday,
  isSunday,
  nextSunday,
  getUnixTime,
} from 'date-fns';
import { MediaInterface, ReportInterface, TotalData } from 'request';

type CombineDataType = ReportInterface | MediaInterface;

const addTypeAndYearMonthDate = (
  data: CombineDataType,
  dataType: 'Report' | 'Media'
) => {
  const date = new Date(data.date);
  const yearMonthDate = format(date, 'yyyy년MM월dd일');
  const monthDate = format(date, 'MM월dd일');

  return { ...data, yearMonthDate, monthDate, dataType };
};

const sortData = (
  combineDataA: CombineDataType,
  combineDataB: CombineDataType
) => {
  const unixTimeA = getUnixTime(new Date(combineDataA.date));
  const unixTimeB = getUnixTime(new Date(combineDataB.date));

  return unixTimeB - unixTimeA;
};

const combineData = (
  reportData: ReportInterface[],
  mediaData: MediaInterface[]
) => {
  const combinedData: CombineDataType[] = [];
  reportData.forEach((report) => {
    combinedData.push(addTypeAndYearMonthDate(report, 'Report'));
  });

  mediaData.forEach((media) => {
    combinedData.push(addTypeAndYearMonthDate(media, 'Media'));
  });

  combinedData.sort(sortData);

  return combinedData;
};

const multiDimensionalUnique = (dateList: string[][]) => {
  const uniques = [];
  const itemsFound: { [key: string]: boolean } = {};

  for (const date of dateList) {
    const stringified = JSON.stringify(date);
    if (itemsFound[stringified]) continue;
    uniques.push(date);
    itemsFound[stringified] = true;
  }

  return uniques;
};

const getStartDateOfWeek = (date: string) => {
  let startDate = new Date(date);
  if (isMonday(startDate))
    return [
      format(startDate, 'yyyy-MM-dd'),
      format(startDate, 'yyyy년MM월dd일'),
    ];

  return [
    format(previousMonday(startDate), 'yyyy-MM-dd'),
    format(previousMonday(startDate), 'yyyy년MM월dd일'),
  ];
};

const getEndDateOfWeek = (date: string) => {
  let endDate = new Date(date);
  if (isSunday(endDate))
    return [format(endDate, 'yyyy-MM-dd'), format(endDate, 'yyyy년MM월dd일')];

  return [
    format(nextSunday(endDate), 'yyyy-MM-dd'),
    format(nextSunday(endDate), 'yyyy년MM월dd일'),
  ];
};

const makeWeekList = (date: string) => {
  const [startDate, startDateOfWeek] = getStartDateOfWeek(date);
  const [endDate, endDateOfWeek] = getEndDateOfWeek(date);
  const periodOfWeek = `${startDateOfWeek} ~ ${endDateOfWeek}`;

  return { periodOfWeek, startDate, endDate };
};

const makeDeduplicatedDateList = (combinedData: CombineDataType[]) => {
  const dateList: string[][] = [];
  [...new Set(combinedData.map((data) => data.date))].forEach((data) => {
    const { periodOfWeek, startDate, endDate } = makeWeekList(data);
    dateList.push([periodOfWeek, startDate, endDate]);
  });

  return multiDimensionalUnique(dateList);
};

const checkBetweenStartAndEndDate = ({
  date,
  startDate,
  endDate,
}: {
  date: string;
  startDate: string;
  endDate: string;
}) => {
  return (
    getUnixTime(new Date(date)) >= getUnixTime(new Date(startDate)) &&
    getUnixTime(new Date(date)) <= getUnixTime(new Date(endDate))
  );
};

const setWeeklyData = (
  dataList: string[][],
  combinedData: CombineDataType[]
) => {
  const weeklyData: TotalData = {};

  dataList.forEach(([periodOfWeek, startDate, endDate]) => {
    const reportData = combinedData.filter(
      (data) =>
        data.dataType === 'Report' &&
        checkBetweenStartAndEndDate({ date: data.date, startDate, endDate })
    );

    const mediaData = combinedData.filter(
      (data) =>
        data.dataType === 'Media' &&
        checkBetweenStartAndEndDate({ date: data.date, startDate, endDate })
    );

    weeklyData[periodOfWeek] = {
      reports: reportData as ReportInterface[],
      media: mediaData as MediaInterface[],
    };
  });

  return weeklyData;
};

const createWeeklyList = (
  reportData: ReportInterface[],
  mediaData: MediaInterface[]
) => {
  const combinedData = combineData(reportData, mediaData);
  const dataList = makeDeduplicatedDateList(combinedData);

  return setWeeklyData(dataList, combinedData);
};

export default createWeeklyList;
