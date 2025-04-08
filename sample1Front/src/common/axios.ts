import axios from 'axios';

import { AUTH_BACK, SAMPLE_BACK } from './const';
import { getCookie, setCookie } from './util';

export const authApi = axios.create({
  baseURL: AUTH_BACK,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sampleApi = axios.create({
  baseURL: SAMPLE_BACK,
  headers: {
    'Content-Type': 'application/json',
  },
});

authApi.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token.accessToken}`;
    }

    return config;
  },
  (error) => console.error('interceptors catch error.', error),
);

authApi.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log('> > > res error interceptor < < <');
    const originalRequest = error.config;
    console.log(originalRequest);

    // 401처리
    if (error.status !== 401) return error;

    try {
      const token = getCookie('token');

      const res = await axios.post(`${AUTH_BACK}/api/v1/user/new-token`, null, {
        headers: { Authorization: `Bearer ${token.refreshToken}` },
      });

      console.log('new accessToken res::', res.data.accessToken);
      setCookie(
        'token',
        JSON.stringify({
          ...token,
          accessToken: res.data.accessToken,
        }),
      );

      originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

      return authApi(originalRequest);
    } catch (err) {
      console.error(err);
    }
  },
);
