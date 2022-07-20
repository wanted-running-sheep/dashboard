import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MediaInterface } from 'request';
import { FormattedMediaInterface } from 'media';

import MediaStatusTable from '@/components/MediaStatusTable';
import Report from '@/components/Report';
import useFormattedMedia from '@/hooks/useFormattedMedia';
import { MEDIA_SOCIAL_KOREAN } from '@/constants/media';

interface MediaStatusProps {
  data: MediaInterface[];
}

const MediaStatus = ({ data }: MediaStatusProps) => {
  const barSize = 28;
  const [formattedMedia, setFormattedMedia] =
    useState<FormattedMediaInterface[]>();
  const [allMedia, setAllMedia] = useState<FormattedMediaInterface[]>();
  const { formatMediaData } = useFormattedMedia(data);

  useEffect(() => {
    setFormattedMedia(formatMediaData('graph'));
    setAllMedia(formatMediaData('all'));
  }, [JSON.stringify(data)]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (allMedia && active && payload && payload.length) {
      const selectedIndex = allMedia.findIndex((obj) => obj.name === label);
      const { name } = allMedia[selectedIndex];

      return (
        <CustomTooltipWrapper>
          <h1>{name}</h1>
          {MEDIA_SOCIAL_KOREAN.map((social, index) => {
            return (
              <div key={index}>
                <b>{social}</b>
                <span>{allMedia[selectedIndex][social]}</span>
              </div>
            );
          })}
        </CustomTooltipWrapper>
      );
    }
    return null;
  };

  return (
    <Report title="매체 현황">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={1000}
          height={300}
          data={formattedMedia}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            ticks={[20, 40, 60, 80, 100]}
            domain={[0, 100]}
            tickSize={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar
            barSize={barSize}
            dataKey="페이스북"
            stackId="a"
            fill="#1774EB"
          />
          <Bar barSize={barSize} dataKey="카카오" stackId="a" fill="#F5D503" />
          <Bar barSize={barSize} dataKey="네이버" stackId="a" fill="#85DA47" />
          <Bar barSize={barSize} dataKey="구글" stackId="a" fill="#F73B01" />
        </BarChart>
      </ResponsiveContainer>
      <MediaStatusTable allMedia={allMedia} />
    </Report>
  );
};

export default MediaStatus;

const CustomTooltipWrapper = styled.div`
  background-color: ${({ theme }) => theme.color.background.navy};
  color: ${({ theme }) => theme.color.font.white};
  padding: 10px 13px;
  border-radius: 10px;

  h1 {
    font-weight: 900;
    font-size: 20px;
    margin-bottom: 5px;
  }

  div {
    ${({ theme }) => theme.mixins.flexBox('center', 'space-between')};
    margin-top: 2px;

    b {
      margin-right: 7px;
    }
  }
`;
