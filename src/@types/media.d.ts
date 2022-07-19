declare module 'media' {
  type mediaTitleType =
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

  interface socialInterface {
    카카오: number;
    구글: number;
    네이버: number;
    페이스북: number;
  }
  interface formattedMediaInterface extends socialInterface {
    name: mediaTitleType;
  }
}
