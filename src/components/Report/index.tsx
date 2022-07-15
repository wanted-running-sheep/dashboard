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
import DropDownMenu from '@/components/DropDownMenu';
import SummaryCard from './SummaryCard';

interface ReportProps {
  data: ReportInterface[];
}

const Report = ({ data }: ReportProps) => {
  return (
    <>
      <DropDownMenu />
      <Container>
        <SummaryContainer>
          <SummaryCard title="ROAS" summary="697%" />
          <SummaryCard title="광고비" summary="3,799만원" />
          <SummaryCard title="노출 수" summary="971만 회" />
          <SummaryCard title="클릭수" summary="9.1만 회" />
          <SummaryCard title="전환 수" summary="8,523 회" />
          <SummaryCard title="매출" summary="2.6억 원" />
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
      </Container>
    </>
  );
};

export default Report;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 20px;

  background-color: ${({ theme }) => theme.color.background.white};
  border-radius: 10px;
`;

const SummaryContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;
