import axios from 'axios';
import { HttpRequest } from '@/api/http/httpRequest';

const baseURL =
  process.env.REACT_APP_MODE === 'DEV'
    ? 'http://localhost:8000'
    : 'https://dasheep-board.herokuapp.com';
export const axiosInstance = axios.create({
  baseURL,
});

export const apiRequest = new HttpRequest(axiosInstance);
