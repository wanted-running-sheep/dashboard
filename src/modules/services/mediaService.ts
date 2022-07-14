import { HttpRequest } from '@/modules/http/httpRequest';
import axios from 'axios';

export const mediaService = axios.create({
  baseURL: 'http://localhost:8000/media',
});

export const mediaRequest = new HttpRequest(mediaService);
