import React, { useEffect } from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ReportInterface } from 'request';
import styled from 'styled-components';
import Report from '@/components/Report';
import AdvertisingCard from '@/components/AdvertisingCard';
import useSummaryData from '@/hooks/useSummaryData';

interface AdvertisingStatusProps {
  data: ReportInterface[];
}

const AdvertisingStatus = ({ data }: AdvertisingStatusProps) => {
  const { summaryData, organizeSummaryData } = useSummaryData();

  useEffect(() => {
    organizeSummaryData(data);
  }, [JSON.stringify(data)]);

  return (
    <Report title="통합 광고 현황">
      <SummaryContainer>
        {summaryData.map(({ title, summary }, index) => (
          <AdvertisingCard key={index} title={title} summary={summary} />
        ))}
      </SummaryContainer>
      <LineChart width={1000} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthDate" style={{ fontSize: '14px' }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="roas" stroke="#8884d8" />
        <Line type="monotone" dataKey="click" stroke="#82ca9d" />
      </LineChart>
    </Report>
  );
};

export default AdvertisingStatus;

const SummaryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 30px;
`;
