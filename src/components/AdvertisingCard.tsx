import React from 'react';
import styled from 'styled-components';

interface SummaryCardProps {
  title: string;
  summary: string;
}
const AdvertisingCrad = ({ title, summary }: SummaryCardProps) => {
  return (
    <Wrapper>
      <p>{title}</p>
      <h1>{summary}</h1>
    </Wrapper>
  );
};

export default AdvertisingCrad;

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => theme.color.border.lightgray};
  width: 28%;
  padding: 15px 10px;
  border-radius: 5px;

  ${({ theme }) => theme.media.tablet`
    width: 32%;
    padding: 10px 5px;
  `}

  p {
    color: ${({ theme }) => theme.color.font.lightgray};
    font-size: 14px;
    margin-bottom: 5px;

    ${({ theme }) => theme.media.tablet`
      font-size: 12px;
    `}
  }
  h1 {
    color: ${({ theme }) => theme.color.font.primary};
    font-size: 20px;

    ${({ theme }) => theme.media.tablet`
      font-size: 17px;
    `}
    ${({ theme }) => theme.media.mobile`
      font-size: 15px;
    `}
    @media screen and (max-width: 380px) {
      font-size: 13px;
    }
  }
`;
