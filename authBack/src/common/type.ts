const SIGN_IN_DATA = {
  BASE: 'BASE',
  SYSTEM: 'SYSTEM',
  SSO: 'SSO',
} as const;

type SIGN_IN_DATA_TYPE = (typeof SIGN_IN_DATA)[keyof typeof SIGN_IN_DATA];

export { SIGN_IN_DATA, SIGN_IN_DATA_TYPE };
