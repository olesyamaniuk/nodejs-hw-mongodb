import dotenv from 'dotenv';
dotenv.config();
export function env(name, defaultValue) {
  const value = process.env[name];
  if (value) return value;
  if (defaultValue) return defaultValue;
  throw new Error(`Missing process.env[${name}]`);
}

export const ENV_VARS = {
  GOOGLE_AUTH_CLIENT_ID: 'GOOGLE_AUTH_CLIENT_ID',
  GOOGLE_AUTH_CLIENT_SECRET: 'GOOGLE_AUTH_CLIENT_SECRET',
  JWT_SECRET: 'JWT_SECRET',
  APP_DOMAIN: 'APP_DOMAIN',
  SMTP_FROM: 'SMTP_FROM',
  SMTP_HOST: 'SMTP_HOST',
  SMTP_PORT: 'SMTP_PORT',
  SMTP_USER: 'SMTP_USER',
  SMTP_PASS: 'SMTP_PASS',
};
