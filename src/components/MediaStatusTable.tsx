import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { formattedMediaInterface } from 'media';
import putCommaIntoNumber from '@/utils/putCommaIntoNumber';

interface MediaStatusTableProps {
  allMedia: formattedMediaInterface[] | undefined;
}
const MediaStatusTable = ({ allMedia }: MediaStatusTableProps) => {
  const tableTitleKorean = {
    cost: '광고비',
    imp: '노출 수',
    click: '클릭 수',
    convValue: '전환 수',
    gross: '매출',
    ctr: '클릭률 (CTR)',
    cvr: '전환율 (CVR)',
    cpc: '클릭 단가 (CPC)',
    cpa: '전환 단가 (CPA)',
    roas: 'ROAS',
  };
  const initNumberFormat = {
    decimalPoint: 1,
  };

  return (
    <>
      {allMedia && (
        <Table>
          <thead>
            <tr>
              <td></td>
              {allMedia.map(({ name }, index) => (
                <th key={index}>{tableTitleKorean[name]}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>카카오</td>
              {allMedia.map(({ 카카오 }, index) => (
                <td key={index}>
                  {putCommaIntoNumber({ ...initNumberFormat, number: 카카오 })}
                </td>
              ))}
            </tr>
            <tr>
              <td>네이버</td>
              {allMedia.map(({ 네이버 }, index) => (
                <td key={index}>
                  {putCommaIntoNumber({ ...initNumberFormat, number: 네이버 })}
                </td>
              ))}
            </tr>
            <tr>
              <td>페이스북</td>
              {allMedia.map(({ 페이스북 }, index) => (
                <td key={index}>
                  {putCommaIntoNumber({
                    ...initNumberFormat,
                    number: 페이스북,
                  })}
                </td>
              ))}
            </tr>
            <tr>
              <td>구글</td>
              {allMedia.map(({ 구글 }, index) => (
                <td key={index}>
                  {putCommaIntoNumber({ ...initNumberFormat, number: 구글 })}
                </td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
};

export default MediaStatusTable;

const Table = styled.table`
  padding: 20px;
  margin-top: 30px;
  width: 100%;
  overflow: scroll;
  tr {
    border-bottom: 2px solid ${({ theme }) => theme.color.border.lightgray};
  }
  th,
  td:first-child {
    text-align: center;
    padding: 10px;
  }
  td {
    text-align: right;
    padding: 8px;
  }
`;
