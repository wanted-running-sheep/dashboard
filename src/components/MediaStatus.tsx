import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MediaInterface } from 'request';
import { formattedMediaInterface } from 'media';

import MediaStatusTable from '@/components/MediaStatusTable';
import Report from '@/components/Report';
import useFormattedMedia from '@/hooks/useFormattedMedia';
interface MediaStatusProps {
  data: MediaInterface[];
}

// TODO - 커스텀 툴팁으로 합계 보이도록 수정하기

const MediaStatus = ({ data }: MediaStatusProps) => {
  const [formattedMedia, setFormattedMedia] =
    useState<formattedMediaInterface[]>();
  const [allMedia, setAllMedia] = useState<formattedMediaInterface[]>();
  const { formatMediaData } = useFormattedMedia(data);

  useEffect(() => {
    const finishedFormat = formatMediaData('graph');
    setFormattedMedia(finishedFormat);
    setAllMedia(formatMediaData('all'));
    console.log(allMedia);
  }, [JSON.stringify(data)]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (allMedia && active && payload && payload.length) {
      const index = allMedia.findIndex((obj) => obj.name === label);
      return (
        <>
          <div>{allMedia[index].name}</div>
        </>
      );
    }
    return null;
  };

  return (
    <Report title="매체 현황">
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
        <YAxis ticks={[20, 40, 60, 80, 100]} domain={[0, 100]} tickSize={40} />
        <Tooltip content={<CustomTooltip />} />
        {/* <Tooltip /> */}
        <Legend />
        <Bar barSize={30} dataKey="페이스북" stackId="a" fill="#1774EB" />
        <Bar barSize={30} dataKey="네이버" stackId="a" fill="#85DA47" />
        <Bar barSize={30} dataKey="카카오" stackId="a" fill="#F5D503" />
        <Bar barSize={30} dataKey="구글" stackId="a" fill="#F73B01" />
      </BarChart>

      <MediaStatusTable allMedia={allMedia} />
    </Report>
  );
};

export default MediaStatus;
