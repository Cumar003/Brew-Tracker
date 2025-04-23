import dotnev from 'dotenv';

dotnev.config();

export const isDev = process.env.NODE_ENV !== "production";

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  URL:  isDev ? process.env.PROD_URL : process.env.DEV_URL,
  BACKEND_URL: isDev ? process.env.PROD_BACKEND_URL : process.env.DEV_BACKEND_URL,
  
  MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
  MONGODB_CLOUD_URL: process.env.MONGODB_CLOUD_URL,

  OTP_EMAIL: process.env.OTP_EMAIL,
  OTP_EMAIL_PASSWORD: process.env.OTP_EMAIL_PASSWORD,
  OTP_EXPIRATION_TIME: 5 * 60 * 1000,

  EMAIL_CONFIG_SERVICE: process.env.OTP_EMAIL_SERVICE,
  EMAIL_CONFIG_USER: process.env.OTP_EMAIL,
  EMAIL_CONFIG_PASS: process.env.OTP_EMAIL_PASSWORD,

  SMTP_HOST: process.env.SMTP_HOST,
  SMTP_PORT: process.env.SMTP_PORT,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  ENCRYPTION_SECRET: process.env.ENCRYPTION_SECRET,

  TIME_ZONE: process.env.TIME_ZONE || 'Europe/Amsterdam',
  LOCALE: process.env.LOCALE || 'en-US',

  emailConfig: {
    service: process.env.OTP_EMAIL_SERVICE,
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_EMAIL_PASSWORD
    }
  }
};

