/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import ServerlessExpress from '@vendia/serverless-express';
import 'reflect-metadata';
import { app } from '../app';

console.log('HANDLER');

export const handler = ServerlessExpress({ app });
