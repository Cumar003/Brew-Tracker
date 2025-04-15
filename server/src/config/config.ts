import dotnev from 'dotenv';

dotnev.config();

export const config = {
  URL: process.env.URL,
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_LOCAL_URL: process.env.MONGODB_LOCAL_URL,
  MONGODB_CLOUD_URL: process.env.MONGODB_CLOUD_URL,

  OTP_EMAIL: process.env.OTP_EMAIL,
  OTP_EMAIL_PASSWORD: process.env.OTP_EMAIL_PASSWORD,
  OTP_EXPIRATION_TIME: 5 * 60 * 1000,

  EMAIL_CONFIG_SERVICE: process.env.OTP_EMAIL_SERVICE,
  EMAIL_CONFIG_USER: process.env.OTP_EMAIL,
  EMAIL_CONFIG_PASS: process.env.OTP_EMAIL_PASSWORD,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_EXPIRATION: process.env.JWT_EXPIRATION,
  ENCRYPTION_SECRET: process.env.ENCYPTION_SECRET,

  TIME_ZONE: process.env.TIME_ZONE,
  LOCALE: process.env.LOCALE,

  emailConfig: {
    service: process.env.OTP_EMAIL_SERVICE,
    auth: {
      user: process.env.OTP_EMAIL,
      pass: process.env.OTP_EMAIL_PASSWORD
    }
  }
};
