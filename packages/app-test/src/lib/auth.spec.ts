import { NextApiRequest } from 'next';
import { handleAuth } from './auth';
import { Config } from './config';

beforeEach(() => {
  jest.resetAllMocks();
});

describe('handleAuth', () => {
  it('works', async () => {
    // Arrange
    const config = new Config({
      BIGCOMMERCE_APP_CLIENT_ID: 'app-client-id',
      BIGCOMMERCE_APP_CLIENT_SECRET: 'app-client-secret',
      VERCEL_URL: 'some-app.vercel.app',
    });
    const queryParams: NextApiRequest['query'] = {};

    // Act
    const output = handleAuth(config, queryParams);

    // Assert
    await expect(output).rejects.toThrow('Bad Request');
  });
});
