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
import Summary from './Summary';

interface ReportProps {
  data: ReportInterface[];
}

const Report = ({ data }: ReportProps) => {
  return (
    <>
      <DropDownMenu />
      <Container>
        <SummaryContainer>
          <Summary />
          <Summary />
          <Summary />
          <Summary />
          <Summary />
          <Summary />
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
  display: flex;
  flex-direction: column;
  padding: 20px;
  width: 1000px;
  align-items: center;

  background-color: ${({ theme }) => theme.color.background.primary};
  border-radius: 10px;
`;

const SummaryContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;
