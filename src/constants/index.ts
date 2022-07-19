export const MANAGEMENT_INPUT_TITLE: {
  [key: string]: string;
} = {
  status: '상태',
  startDate: '광고 생성일',
  budget: '일 희망 예산',
  roas: '광고 수익률',
  convValue: '매출',
  cost: '광고 비용',
};

export const MANAGEMENT_STATUS: { [key: string]: string } = {
  active: '진행중',
  ended: '종료',
};

export const MANAGEMENT_STATUS_KOR_TO_ENG: { [key: string]: string } = {
  진행중: 'active',
  종료: 'ended',
};
