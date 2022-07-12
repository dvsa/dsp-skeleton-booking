import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { ProductID, TestCentreID } from '../client/types/referenceTypes';
import { types } from '../ioc/types';
import {
  BookTestSession, BookTestSessionService,
} from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestLocationViewModel = {
  test_type: ProductID
  test_centre?: TestCentreID
};

type TestLocationFormModel = {
  test_centre: TestCentreID
};

@injectable()
export class TestLocationController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-location')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req)

    this.logger.info('test location session', session);

    this.showTestLocationController(res, session);
  }

  private post(req: Request, res: Response): void {
    const body: TestLocationFormModel = <TestLocationFormModel>req.body;

    this.logger.info('test location body', body);

    const session: BookTestSession = this.sessionService.get(req)

    this.sessionService.set(req, {
      ...session,
      test_centre: body.test_centre,
    });

    res.redirect('/test-date');
  }

  private showTestLocationController(res: Response, session: BookTestSession): void {
    const viewModel: TestLocationViewModel = {
      test_type: session.test_type,
      test_centre: session.test_centre,
    };

    res.render('test-location.html', viewModel);
  }
}
