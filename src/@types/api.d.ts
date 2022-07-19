declare module 'request' {
  type ApiUrlType = '/media' | '/advertisements' | '/report';
  type ApiDataType = 'Report' | 'Media';
  type CombineDataType = ReportInterface | MediaInterface;

  interface ReportInterface {
    dataType: ApiDataType;
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
    cost: number;
    convValue: number;
    roas: number;
  }

  //
  interface AdvertisementInterface {
    id: number;
    adType: 'web' | 'app';
    title: string;
    budget: number;
    status: string;
    startDate: string;
    endDate: string | null;
    report: AdvertisementReportInterface;
  }

  interface MediaInterface {
    dataType: ApiDataType;
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

  interface TotalDataInterface {
    [date: string]: {
      reports: ReportInterface[];
      media: MediaInterface[];
    };
  }
}
