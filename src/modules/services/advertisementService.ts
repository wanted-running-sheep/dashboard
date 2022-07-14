import { HttpRequest } from '@/modules/http/httpRequest';

import axios from 'axios';

export const advertisementService = axios.create({
  baseURL: 'http://localhost:8000/advertisements',
});

export const advertisementRequest = new HttpRequest(advertisementService);
