declare module 'request' {
  type ApiUrlType = '/media' | '/advertisements' | '/report';
  interface ReportInterface {
    dataType: 'Report' | 'Media';
    imp: number;
    click: number;
    cost: number;
    conv: number;
    convValue: number;
    ctr: number;
    cvr: number;
    cpc: number;
    cpa: number;
    roas: number;
    date: string;
    yearMonthDate: string;
    monthDate: string;
  }

  interface AdvertisementReportInterface {
    const: number;
    convValue: number;
    roas: number;
  }

  //
  interface AdvertisementInterface {
    id: number;
    adType: string;
    title: string;
    budget: number;
    status: string;
    startDatae: string;
    endDate: string | null;
    report: AdvertisementReportInterface;
  }

  interface MediaInterface {
    dataType: 'Report' | 'Media';
    channel: string;
    date: string;

    monthDate: string;
    imp: number;
    click: number;
    cost: number;
    convValue: number;
    ctr: number;
    cvr: number;
    cpc: number;
    cpa: number;
    roas: number;
  }

  interface TotalDataManagementInterface {
    reports: ReportInterface[];
    media: MediaInterface[];
  }

  interface TotalData {
    [date: string]: {
      reports: ReportInterface[];
      media: MediaInterface[];
    };
  }
}
