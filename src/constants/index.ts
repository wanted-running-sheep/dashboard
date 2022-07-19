type DefaultObjType = { [key: string]: string };
export const MANAGEMENT_INPUT_TITLE: DefaultObjType = {
  status: '상태',
  startDate: '광고 생성일',
  budget: '일 희망 예산',
  roas: '광고 수익률',
  convValue: '매출',
  cost: '광고 비용',
};

export const MANAGEMENT_STATUS: DefaultObjType = {
  active: '진행중',
  ended: '종료',
};

export const MANAGEMENT_STATUS_KOR_TO_ENG: { [key: string]: string } = {
  진행중: 'active',
  종료: 'ended',
};

export const BUTTON_TYPE = {
  EDIT: 'edit',
  COMPLETE: 'complete',
  CANCEL: 'cancel',
};

export const MSG_UPDATE_COMPLETE = '수정 완료 하였습니다.';
export const MSG_UPDATE_FAILED =
  '수정 실패 하였습니다. 지속 발생할 경우 관리자에게 문의주세요.';

export const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
