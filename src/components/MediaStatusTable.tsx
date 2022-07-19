import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { formattedMediaInterface } from 'media';
import { MEDIA_COLUMN_KOREAN, MEDIA_SOCIAL_KOREAN } from '@/constants/media';

interface MediaStatusTableProps {
  allMedia: formattedMediaInterface[] | undefined;
}
const MediaStatusTable = ({ allMedia }: MediaStatusTableProps) => {
  return (
    <>
      {allMedia && (
        <Table>
          <thead>
            <tr>
              <td></td>
              {allMedia.map(({ name }, index) => (
                <th key={index}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>구글</td>
              {allMedia.map(({ 구글 }, index) => (
                <td key={index}>{구글}</td>
              ))}
            </tr>
            <tr>
              <td>네이버</td>
              {allMedia.map(({ 네이버 }, index) => (
                <td key={index}>{네이버}</td>
              ))}
            </tr>
            <tr>
              <td>카카오</td>
              {allMedia.map(({ 카카오 }, index) => (
                <td key={index}>{카카오}</td>
              ))}
            </tr>

            <tr>
              <td>페이스북</td>
              {allMedia.map(({ 페이스북 }, index) => (
                <td key={index}>{페이스북}</td>
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
