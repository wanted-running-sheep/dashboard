declare module 'media' {
  type MediaTitleType =
    | 'imp'
    | 'click'
    | 'cost'
    | 'convValue'
    | 'ctr'
    | 'cvr'
    | 'cpc'
    | 'cpa'
    | 'roas'
    | 'gross'; //매출

  type MediaTitleKoreanType =
    | '노출 수'
    | '클릭 수'
    | '광고비'
    | '전환 수'
    | '클릭률 (CTR)'
    | '전환율 (CVR)'
    | '클릭 단가 (CPC)'
    | '전환 단가 (CPA)'
    | 'ROAS'
    | '매출';
  type SocialTitleType = '페이스북' | '네이버' | '구글' | '카카오';

  interface SocialInterface {
    카카오: number | string;
    구글: number | string;
    네이버: number | string;
    페이스북: number | string;
  }
  interface FormattedMediaInterface extends SocialInterface {
    name: MediaTitleKoreanType;
  }
}
