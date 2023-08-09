import { NextRequest, NextResponse } from 'next/server';
import HttpErrors from 'http-errors';
import { Config } from '../../../lib/config';
import { handleAuth } from '../../../lib/auth';

export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  console.log(`Received req: ${req.method}, ${params.toString()} `);
  const config = new Config(process.env);

  try {
    console.log(`calling handleAuth`);
    await handleAuth(config, {
      account_uuid: params.get('account_uuid') ?? '',
      code: params.get('code') ?? '',
      context: params.get('context') ?? '',
      scope: params.get('scope') ?? '',
    });
    console.log(`called it`);
    return NextResponse.redirect('/', 302);
  } catch (error) {
    if (HttpErrors.isHttpError(error)) {
      return NextResponse.json(
        {
          status: error.status,
          error: error.message,
        },
        { status: error.status }
      );
    } else {
      return NextResponse.json(
        {
          status: 500,
          error: 'Internal Error',
        },
        { status: 500 }
      );
    }
  }
}
