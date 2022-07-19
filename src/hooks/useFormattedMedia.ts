import { useState, useCallback } from 'react';
import { MediaInterface } from 'request';
import { mediaTitleType, formattedMediaInterface } from 'media';

type callType = 'graph' | 'all';

const useFormattedMedia = (weeklyMedia: MediaInterface[]) => {
  const PERCENTAGE = 100;

  // 결과 값 반올림
  const roundSummary = (summary: number) => {
    const roundedSummary = Math.round(summary);
    return roundedSummary;
  };

  // 전체 media 데이터 - channel
  // (ex: 전체 데이터에서 유튜브 데이터만 가져오기)
  const filterByChannel = (channel: string) => {
    return weeklyMedia.filter(
      (selectedMedia) => selectedMedia.channel === channel
    );
  };

  // 일부 채널 데이터에서 title에 맞는 데이터만 전체 합 구하기
  // (ex: 유튜브 데이터에서 imp 데이터 전체 합 구하기)
  const reduceByFilteredMedia = useCallback(
    (channel: string, title: mediaTitleType) => {
      return filterByChannel(channel).reduce((acc, cur) => {
        if (title === 'gross')
          return (acc += (cur.roas * cur.cost) / PERCENTAGE);
        return (acc += cur[title]);
      }, 0);
    },
    [filterByChannel]
  );

  // 각 채널, 각 컬럼별로 합계를 구하고 type 별로 데이터 포맷을 변경하여 넘기기
  const sumMediaByTitle = useCallback(
    (title: mediaTitleType, type: callType) => {
      const kakaoSummary = reduceByFilteredMedia('kakao', title);
      const googleSummary = reduceByFilteredMedia('google', title);
      const naverSummary = reduceByFilteredMedia('naver', title);
      const facebookSummary = reduceByFilteredMedia('facebook', title);

      const summary =
        kakaoSummary + googleSummary + naverSummary + facebookSummary;

      if (type === 'all') {
        return {
          name: title,
          카카오: kakaoSummary,
          네이버: naverSummary,
          구글: googleSummary,
          페이스북: facebookSummary,
        };
      }
      return {
        name: title,
        카카오: roundSummary((kakaoSummary / summary) * PERCENTAGE),
        네이버: roundSummary((naverSummary / summary) * PERCENTAGE),
        구글: roundSummary((googleSummary / summary) * PERCENTAGE),
        페이스북: roundSummary((facebookSummary / summary) * PERCENTAGE),
      };
    },
    [reduceByFilteredMedia]
  );

  // type 값에 따라 계산될 컬럼 설정하기
  const formatMediaData = useCallback(
    (type: callType) => {
      const titles: mediaTitleType[] = [
        'cost',
        'imp',
        'click',
        'convValue',
        'gross',
      ];
      if (type === 'all') {
        titles.push('ctr', 'cvr', 'cpc', 'cpa', 'roas');
      }
      const graphSummary: formattedMediaInterface[] = titles.map((title) => {
        return sumMediaByTitle(title, type);
      });

      return graphSummary;
    },
    [sumMediaByTitle]
  );

  return { formatMediaData };
};

export default useFormattedMedia;
