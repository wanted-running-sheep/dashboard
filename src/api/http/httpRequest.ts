import { AxiosInstance } from 'axios';
import { ApiUrlType } from 'request';

export class HttpRequest {
  private service: AxiosInstance;

  constructor(service: AxiosInstance) {
    this.service = service;
  }

  get(url: ApiUrlType, queryString = '') {
    return this.service.get(`${url}?${queryString}`).catch((error) => {
      console.log('error: ', error);
    });
  }

  patch<T>(id: number, data: T) {
    return this.service.patch(`/${id}`, data);
  }
}
