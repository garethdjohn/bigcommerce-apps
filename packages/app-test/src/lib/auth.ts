import HttpErrors from 'http-errors';
import BigCommerce from '@bigcommerce/api-nodejs';
import { Config } from './config';

export async function handleAuth(
  config: Config,
  {
    account_uuid,
    code,
    context,
    scope,
  }: { account_uuid: string; code: string; context: string; scope: string }
) {
  console.log(JSON.stringify({ account_uuid, code, context, scope }));

  console.log(
    JSON.stringify({
      appBaseUrl: config.appBaseUrl,
      bigCommerceAppClientId: config.bigCommerceAppClientId,
      bigCommerceAppClientSecret: config.bigCommerceAppClientSecret,
    })
  );
  const bigcommerceAuth = new BigCommerce.Auth({
    clientId: config.bigCommerceAppClientId,
    clientSecret: config.bigCommerceAppClientSecret,
    // authCallback: new URL('/api/auth', config.appBaseUrl).href,
    authCallback: 'https://bigcommerce-app-test.vercel.app/api/auth',
  });

  if (typeof code === 'string' && typeof context === 'string' && typeof scope === 'string') {
    const authResponsePayload = await bigcommerceAuth.authorize({
      code,
      scope,
      context,
    });
  } else {
    throw new HttpErrors.BadRequest();
  }
}
