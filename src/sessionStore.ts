/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import session, { SessionOptions } from 'express-session';
import DynamoDBStore from 'dynamodb-store';
import { RequestHandler } from 'express';

function getSessionStore(): RequestHandler {
  const sessionOptions: SessionOptions = {
    name: 'session-cookie',
    secret: 'test-secret',
    cookie: {
      sameSite: true,
      secure: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new DynamoDBStore({
      table: {
        name: 'dsp-alpha-session-store',
        hashKey: 'session-key',
      },
      ttl: 600000,
      keepExpired: false,
    }),
  };

  return session(sessionOptions);
}

export { getSessionStore };
