import axios from 'axios';

import { AUTH_BACK } from './const';

export const authApi = axios.create({
  baseURL: AUTH_BACK,
  headers: {
    'Content-Type': 'application/json',
  },
});
