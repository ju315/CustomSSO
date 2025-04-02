import { JwtPayload } from 'jwt-decode';

export interface TokenData extends JwtPayload {
  uuid?: string;
  userId?: string;
}
