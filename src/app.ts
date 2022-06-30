/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import express, { Express } from 'express';
import bodyParser from 'body-parser';
import { attachRoutes } from './routes';
import { configureNunjucks } from './nunjucks';
import { getSessionStore } from './sessionStore';

const app: Express = express();

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(getSessionStore());

attachRoutes(app);
configureNunjucks(app);

export { app };
