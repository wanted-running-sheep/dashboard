declare module 'request' {
  interface AdvertisementReportInterface {
    const: number;
    convValue: number;
    roas: number;
  }

  interface AdvertisementProps {
    id: number;
    adType: string;
    title: string;
    budget: number;
    status: string;
    startDatae: string;
    endDate: string | null;
    report: AdvertisementReportInterface;
  }

  interface MediaProps {
    channel: string;
    date: string;
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

  interface ReportProps {
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
  }
}
