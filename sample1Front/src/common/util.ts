import { Cookies } from 'react-cookie';
import { CookieSetOptions } from 'universal-cookie';
import { SignType } from './type';

const cookies = new Cookies();

export const setCookie = (
  name: string,
  value: string,
  options?: CookieSetOptions,
) => {
  return cookies.set(name, value, { ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const clearCookie = (name: string) => {
  cookies.remove(name);
};

export const getVersionPrefix = (type: SignType) => {
  return type === SignType.BASE ? 'v1' : type === SignType.SYSTEM ? 'v2' : 'v3';
};
