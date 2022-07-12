/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Application } from 'express';
import path from 'path';
import nunjucks from 'nunjucks';
import { displayTestType } from './filters/testType';
import { ProductID, ServiceTypeID, TestCentreID } from './client/types/referenceTypes';

export function configureNunjucks(app: Application): void {
  app.set('views', path.join(__dirname, '../views'));

  const env: nunjucks.Environment = nunjucks.configure(
    [
      'node_modules/govuk-frontend/',
      'views',
    ], {
      autoescape: true,
      express: app,
      noCache: true,
    },
  );

  env.addFilter('displayTestType', displayTestType)

  env.addGlobal('ProductID', ProductID)
  env.addGlobal('ServiceTypeID', ServiceTypeID)
  env.addGlobal('TestCentreID', TestCentreID)

  app.set('view engine', 'html');
}
