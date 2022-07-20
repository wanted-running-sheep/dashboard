import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormattedMediaInterface } from 'media';
import { MEDIA_SOCIAL_KOREAN } from '@/constants/media';

interface MediaStatusTableProps {
  allMedia: FormattedMediaInterface[] | undefined;
}
const MediaStatusTable = ({ allMedia }: MediaStatusTableProps) => {
  return (
    <>
      {allMedia && (
        <TableWrapper>
          <table>
            <thead>
              <tr>
                <td></td>
                {allMedia.map(({ name }, index) => (
                  <th key={index}>{name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MEDIA_SOCIAL_KOREAN.map((social, index) => {
                return (
                  <tr key={index}>
                    <td>{social}</td>
                    {allMedia.map((media, index) => (
                      <td key={index}>{media[social]}</td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </TableWrapper>
      )}
    </>
  );
};

export default MediaStatusTable;

const TableWrapper = styled.div`
  width: 100%;
  padding: 20px;
  margin-top: 30px;
  overflow-x: scroll;

  table {
    width: 100%;
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
      min-width: 90px;
    }
  }
`;
