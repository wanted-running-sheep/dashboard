import React, { ReactNode } from 'react';
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

interface ReportProps {
  title?: string;
  children: ReactNode;
}

const Report = ({ title, children }: ReportProps) => {
  return (
    <Wrapper>
      {title && <h1>{title}</h1>}
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Report;

const Wrapper = styled.div`
  margin-bottom: 40px;
  & > h1 {
    color: ${({ theme }) => theme.color.font.primary};
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
  }
`;
const Container = styled.div`
  ${({ theme }) => theme.mixins.lightBoxShadow()}
  background-color: ${({ theme }) => theme.color.background.white};
  width: 100%;
  padding: 20px;
  border-radius: 10px;
`;
