import axios from 'axios';
import { HttpRequest } from '@/api/http/httpRequest';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
});

export const apiRequest = new HttpRequest(axiosInstance);
