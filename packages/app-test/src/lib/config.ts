import 'dotenv/config';
import * as envalid from 'envalid';

export class Config {
  bigCommerceAppClientId: string;
  bigCommerceAppClientSecret: string;
  appBaseUrl: URL;

  constructor(env: Record<string, string | undefined> = process.env) {
    const cleanEnv = envalid.cleanEnv(env, {
      BIGCOMMERCE_APP_CLIENT_ID: envalid.str(),
      BIGCOMMERCE_APP_CLIENT_SECRET: envalid.str(),
      VERCEL_URL: envalid.str(),
    });

    this.bigCommerceAppClientId = cleanEnv.BIGCOMMERCE_APP_CLIENT_ID;
    this.bigCommerceAppClientSecret = cleanEnv.BIGCOMMERCE_APP_CLIENT_SECRET;
    this.appBaseUrl = new URL(`https://${cleanEnv.VERCEL_URL}`);
  }
}
