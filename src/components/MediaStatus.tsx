import React from 'react';
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

import Report from '@/components/Report';
import useFormattedMedia from '@/hooks/useFormattedMedia';

interface MediaStatusProps {
  data: MediaInterface[];
}

// TODO - 커스텀 툴팁으로 합계 보이도록 수정하기
// TODO - 합계를 이용하여 아래 테이블 추가하기

const MediaStatus = ({ data }: MediaStatusProps) => {
  const { formatGraphData } = useFormattedMedia(data);
  const formattedMedia = formatGraphData();

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
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="페이스북" stackId="a" fill="#1774EB" />
          <Bar dataKey="네이버" stackId="a" fill="#85DA47" />
          <Bar dataKey="카카오" stackId="a" fill="#F5D503" />
          <Bar dataKey="구글" stackId="a" fill="#F73B01" />
        </BarChart>
      </ResponsiveContainer>
    </Report>
  );
};

export default MediaStatus;
