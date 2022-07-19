import { useState } from 'react';
import { MediaInterface } from 'request';

// TODO - roas 사용해서 매출 계산하기
// FIXME - useCallback / useMemo 사용하여 리팩터링하기

type mediaTitle =
  | 'imp'
  | 'click'
  | 'cost'
  | 'convValue'
  | 'ctr'
  | 'cvr'
  | 'cpc'
  | 'cpa'
  | 'roas';
const useFormattedMedia = (weeklyMedia: MediaInterface[]) => {
  const [media, setMedia] = useState<MediaInterface[]>(weeklyMedia);

  const roundSummary = (summary: number) => {
    const roundedSummary = Math.round(summary);
    return roundedSummary;
  };
  const filterByChannel = (channel: string) => {
    return media.filter((selectedMedia) => selectedMedia.channel === channel);
  };
  const sumDataByTitle = (title: mediaTitle) => {
    const PERCENTAGE = 100;
    if (title !== 'roas') {
      const kakaoSummary = filterByChannel('kakao').reduce((acc, cur) => {
        return (acc += cur[title]);
      }, 0);
      const googleSummary = filterByChannel('google').reduce((acc, cur) => {
        return (acc += cur[title]);
      }, 0);
      const naverSummary = filterByChannel('naver').reduce((acc, cur) => {
        return (acc += cur[title]);
      }, 0);
      const facebookSummary = filterByChannel('facebook').reduce((acc, cur) => {
        return (acc += cur[title]);
      }, 0);
      const summary =
        kakaoSummary + googleSummary + naverSummary + facebookSummary;

      return {
        name: title,
        카카오: roundSummary((kakaoSummary / summary) * PERCENTAGE),
        구글: roundSummary((googleSummary / summary) * PERCENTAGE),
        네이버: roundSummary((naverSummary / summary) * PERCENTAGE),
        페이스북: roundSummary((facebookSummary / summary) * PERCENTAGE),
      };
    }
  };
  const formatGraphData = () => {
    const formattedMedia = [];
    formattedMedia.push(sumDataByTitle('cost'));
    formattedMedia.push(sumDataByTitle('imp'));
    formattedMedia.push(sumDataByTitle('click'));
    formattedMedia.push(sumDataByTitle('convValue'));

    return formattedMedia;
  };

  return { formatGraphData };
};

export default useFormattedMedia;
