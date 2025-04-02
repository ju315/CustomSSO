import { Request } from 'express';

const convertToIpv4 = (ip: string | string[]) => {
  return ip.toString().replace(/^::ffff:/, '');
};

export const getRealIp = (req: Request): string => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return convertToIpv4(ip);
};
