import { HttpRequest } from '@/modules/http/httpRequest';
import axios from 'axios';

export const reportService = axios.create({
  baseURL: 'http://localhost:8000/report',
});

export const reportRequest = new HttpRequest(reportService);
