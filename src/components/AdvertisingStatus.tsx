import React from 'react';
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
import AdvertisingCrad from '@/components/AdvertisingCrad';

interface AdvertisingStatusProps {
  data: ReportInterface[];
}
const AdvertisingStatus = ({ data }: AdvertisingStatusProps) => {
  return (
    <Report title="통합 광고 현황">
      <SummaryContainer>
        <AdvertisingCrad title="ROAS" summary="697%" />
        <AdvertisingCrad title="광고비" summary="3,799만원" />
        <AdvertisingCrad title="노출 수" summary="971만 회" />
        <AdvertisingCrad title="클릭수" summary="9.1만 회" />
        <AdvertisingCrad title="전환 수" summary="8,523 회" />
        <AdvertisingCrad title="매출" summary="2.6억 원" />
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
