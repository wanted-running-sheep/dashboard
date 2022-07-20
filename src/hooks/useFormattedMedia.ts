import { useState, useCallback } from 'react';
import { MediaInterface } from 'request';
import {
  MediaTitleType,
  FormattedMediaInterface,
  MediaTitleKoreanType,
} from 'media';

import putCommaIntoNumber from '@/utils/putCommaIntoNumber';
import { MEDIA_COLUMN_KOREAN } from '@/constants/media';

type callType = 'graph' | 'all';

const useFormattedMedia = (weeklyMedia: MediaInterface[]) => {
  const PERCENTAGE = 100;
  const initNumberFormat = {
    decimalPoint: 1,
  };

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
    (channel: string, title: MediaTitleType) => {
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
    (title: MediaTitleType, type: callType) => {
      const kakaoSummary = reduceByFilteredMedia('kakao', title);
      const googleSummary = reduceByFilteredMedia('google', title);
      const naverSummary = reduceByFilteredMedia('naver', title);
      const facebookSummary = reduceByFilteredMedia('facebook', title);

      const summary =
        kakaoSummary + googleSummary + naverSummary + facebookSummary;
      const koreanColumnName = MEDIA_COLUMN_KOREAN[
        title
      ] as MediaTitleKoreanType;

      if (type === 'all') {
        return {
          name: koreanColumnName,
          카카오: putCommaIntoNumber({
            ...initNumberFormat,
            number: kakaoSummary,
          }),
          네이버: putCommaIntoNumber({
            ...initNumberFormat,
            number: naverSummary,
          }),
          구글: putCommaIntoNumber({
            ...initNumberFormat,
            number: googleSummary,
          }),
          페이스북: putCommaIntoNumber({
            ...initNumberFormat,
            number: facebookSummary,
          }),
        };
      }
      return {
        name: koreanColumnName,
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
      const titles: MediaTitleType[] = [
        'cost',
        'imp',
        'click',
        'convValue',
        'gross',
      ];
      if (type === 'all') {
        titles.push('ctr', 'cvr', 'cpc', 'cpa', 'roas');
      }
      const graphSummary: FormattedMediaInterface[] = titles.map((title) => {
        return sumMediaByTitle(title, type);
      });

      return graphSummary;
    },
    [sumMediaByTitle]
  );

  return { formatMediaData };
};

export default useFormattedMedia;
