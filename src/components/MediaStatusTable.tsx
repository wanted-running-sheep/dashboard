import React, { useEffect, useState } from 'react';
import { MediaInterface } from 'request';
import styled from 'styled-components';

interface MediaStatusTableProps {
  data: MediaInterface[];
}

//표시 데이터: 광고비, 매출, ROAS, 노출수, 클릭수, 클릭율(CTR), 클릭당비용(CPC), 전환율(CVR), 전환단가(CPA)
type mediaTitles =
  | 'cost'
//  | 'gross' //매출액. gross = (roas * cost) / 100
  | 'roas'
  | 'imp'
  | 'click'
  | 'ctr'
  | 'cpc'
  | 'cvr'
  | 'cpa';

const MediaStatusTable = ({data}: MediaStatusTableProps) => {
  const [media, setMedia] = useState<MediaInterface[]>(data);
  const [tableData, setTableData] = useState<any[]>([]);
  
  const filterByChannel = (channel: string) => {
    return media.filter((selected) => selected.channel === channel);
  };

  const sumData = (title: mediaTitles) => {
    const kakaoSum = filterByChannel('kakao').reduce((acc, cur) => {
      return (acc += cur[title]);
    }, 0);
    const googleSum = filterByChannel('google').reduce((acc, cur) => {
      return (acc += cur[title]);
    }, 0);
    const naverSum = filterByChannel('naver').reduce((acc, cur) => {
      return (acc += cur[title]);
    }, 0);
    const facebookSum = filterByChannel('facebook').reduce((acc, cur) => {
      return (acc += cur[title]);
    }, 0);
    // const sum = kakaoSum + googleSum + naverSum + facebookSum;

    return { title, kakaoSum, googleSum, naverSum, facebookSum };
  };

  const formatTableData = () => {
    const formattedData:any[] = [];
    formattedData.push(sumData('cost'));
    formattedData.push(sumData('roas'));
    formattedData.push(sumData('imp'));
    formattedData.push(sumData('click'));
    formattedData.push(sumData('ctr'));
    formattedData.push(sumData('cpc'));
    formattedData.push(sumData('cvr'));
    formattedData.push(sumData('cpa'));
    console.log(formattedData);
    setTableData(formattedData);
  }

  useEffect(() => {
    formatTableData();
  },[JSON.stringify(data)]);
  
  return (
    <>
      {tableData.length !== 0 && (
        <Table>
          <thead>
            <tr>
              {tableData.map(({title},i) => (
                <th key={i}>{title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {tableData.map(({kakaoSum}, i) => (
                <td key={i}>{kakaoSum}</td>
              ))}
            </tr>
            <tr>
              {tableData.map(({googleSum}, i) => (
                <td key={i}>{googleSum}</td>
              ))}
            </tr>
            <tr>
              {tableData.map(({naverSum}, i) => (
                <td key={i}>{naverSum}</td>
              ))}
            </tr>
            <tr>
              {tableData.map(({facebookSum}, i) => (
                <td key={i}>{facebookSum}</td>
              ))}
            </tr>
          </tbody>
        </Table>
      )}
    </>
  );
}

export default MediaStatusTable;

const Table = styled.table`
  padding: 20px;
  margin-top: 30px;
  width: 100%;
  overflow: scroll;
  tr {
    border-bottom: 2px solid ${({ theme }) => theme.color.border.lightgray};
  }
  td, th {
    text-align: center;
    padding: 10px 10px;
  }
`;