import React, { useState, useEffect } from 'react';
import { ReportInterface } from 'request';
import putCommaIntoNumber from '@/utils/putCommaIntoNumber';

interface SummaryData {
  title: string;
  summary: string;
}

const useSummaryData = (data: ReportInterface[]) => {
  const [summaryData, setSummaryData] = useState<SummaryData[]>([]);

  useEffect(() => {
    organizeSummaryData(data);
  }, [JSON.stringify(data)]);

  const organizeSummaryData = (weekData: ReportInterface[]) => {
    const totalDataSize = weekData.length;
    const organizedSummary: SummaryData[] = [];
    const types = ['roas', 'cost', 'imp', 'click', 'conv', 'sales'];
    const titles = ['ROAS', '광고비', '노출 수', '클릭수', '전환 수', '매출'];

    let summaryValueList = new Array(6).fill(0);
    for (let data of weekData) {
      summaryValueList[0] += data.roas;
      summaryValueList[1] += data.cost; // 광고비
      summaryValueList[2] += data.imp; // 노출 수
      summaryValueList[3] += data.click; // 클릭 수
      summaryValueList[4] += data.conv; // 전환 수
    }
    summaryValueList[0] = Math.round(summaryValueList[0] / totalDataSize); // ROAS 평균
    summaryValueList[5] += (summaryValueList[0] * summaryValueList[1]) / 100; // 매출

    for (let i = 0; i < titles.length; i++) {
      organizedSummary.push({
        title: titles[i],
        summary: getformattedSummaryValue(summaryValueList[i], types[i]),
      });
    }

    setSummaryData(organizedSummary);
  };

  const getformattedSummaryValue = (value: number, type: string): string => {
    if (type === 'roas') {
      return `${getKoreanUnit(value)}%`;
    } else if (type === 'cost' || type === 'sales') {
      return `${getKoreanUnit(value)} 원`;
    }
    return `${getKoreanUnit(value)} 회`;
  };

  const getKoreanUnit = (value: number): string => {
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

  return {
    summaryData,
  };
};

export default useSummaryData;
