import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { types } from '../ioc/types';
import {
  BookTestSession, BookTestSessionService, TestCentre, TestType,
} from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestLocationViewModel = {
  test_type: TestType
  test_centre?: TestCentre
};

type TestLocationFormModel = {
  test_centre: TestCentre
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

    res.redirect('/test-slots');
  }

  private showTestLocationController(res: Response, session: BookTestSession): void {
    const viewModel: TestLocationViewModel = {
      test_type: session.test_type,
      test_centre: session.test_centre,
    };

    res.render('test-location.html', viewModel);
  }
}
