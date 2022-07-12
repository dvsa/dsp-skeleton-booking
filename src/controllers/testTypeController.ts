import {
  Application,
  NextFunction,
  Request,
  Response,
} from 'express';
import { inject, injectable } from 'inversify';
import {
  BookTestSession, BookTestSessionService,
} from '../services/session/bookTestSessionService';
import { types } from '../ioc/types';
import { Controller } from './controller';
import { Logger } from '../util/logger';
import { ProductID } from '../client/types/referenceTypes';

type TestTypeForm = {
  test_type: ProductID
};

type TestTypeViewModel = {
  test_type? : ProductID
};

@injectable()
export class TestTypeController implements Controller {
  constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-type')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response, next: NextFunction) => this.post(req, res, next));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req, {});

    this.logger.info('Test-Type Session', session);

    this.showTestTypePage(res, session);
  }

  private post(req: Request, res: Response, next: NextFunction): void {
    try {
      const body: TestTypeForm = <TestTypeForm> req.body;
      const session: BookTestSession = this.sessionService.get(req, {});

      this.sessionService.set(req, {
        ...session,
        test_type: body.test_type,
      });

      res.redirect('/test-requirements');
    } catch (err: unknown) {
      next(err);
    }
  }

  private showTestTypePage(res: Response, session: BookTestSession): void {
    const viewModel: TestTypeViewModel = {
      test_type: session?.test_type,
    };

    return res.render('test-type.html', viewModel);
  }
}
