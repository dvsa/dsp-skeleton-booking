import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import moment from 'moment';
import { SlotClient } from '../client/slotClient';
import { ProductID } from '../client/types/referenceTypes';
import { types } from '../ioc/types';
import { BookTestSession, BookTestSessionService } from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestDateFormModel = {
  'from-year': string
  'from-month': string
  'from-day': string
  'to-year': string
  'to-month': string
  'to-day': string
};

type TestDateViewModel = {
  test_type: ProductID
  from_year?: string
  from_month?: string
  from_day?: string
  to_year?: string
  to_month?: string
  to_day?: string
};

@injectable()
export class TestDateController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.SlotClient) private client: SlotClient,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-date')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private async get(req: Request, res: Response): Promise<void> {
    const session: BookTestSession = this.sessionService.get(req)
    this.logger.info('test slots session', session);

    this.showTestDateView(res, session);
  }

  private async post(req: Request, res: Response): Promise<void> {
    const body: TestDateFormModel = <TestDateFormModel>req.body;
    this.logger.info('test slots body', body);

    const session: BookTestSession = this.sessionService.get(req);

    this.sessionService.set(req, {
      ...session,
      from_date: this.buildDate(body['from-year'], body['from-month'], body['from-day']),
      to_date: this.buildDate(body['to-year'], body['to-month'], body['to-day']),
    });

    res.redirect('/test-slots');
  }

  private showTestDateView(res: Response, session: BookTestSession): void {
    const viewModel: TestDateViewModel = {
      test_type: session.test_type
    };

    res.render('test-date.html', viewModel);
  }

  private buildDate(year: string, month: string, day: string): string {
    return moment(`${year}-${month}-${day}`, 'YYYY-MM-DD').toISOString();
  }
}
