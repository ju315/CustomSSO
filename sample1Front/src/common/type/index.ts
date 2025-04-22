import { JwtPayload } from 'jwt-decode';

export interface TokenData extends JwtPayload {
  uuid?: string;
  userId?: string;
}

export enum SignType {
  BASE = 'BASE',
  NORMAL = 'NORMAL',
  SSO = 'SSO',
}
