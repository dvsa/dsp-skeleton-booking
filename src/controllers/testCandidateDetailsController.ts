import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { types } from '../ioc/types';
import { BookTestSession, BookTestSessionService } from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestCandidateDetailsFormModel = {
  first_name: string
  surname: string
  telephone_number: string
  email_address: string
};

type TestCandidateDetailsViewModel = {
  test_type: string
  first_name?: string
  surname?: string
  telephone_number?: string
  email_address?: string
 }

@injectable()
export class TestCandidateDetailsController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-candidate-details')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req)

    this.logger.info('test candidate session', session);

    this.showTestCandidateDetailsView(res, session);
  }

  private post(req: Request, res: Response): void {
    const body: TestCandidateDetailsFormModel = <TestCandidateDetailsFormModel>req.body;

    this.logger.info('test slots body', body);

    const session: BookTestSession = this.sessionService.get(req)

    this.sessionService.set(req, {
      ...session,
      first_name: body.first_name,
      surname: body.surname,
      telephone_number: body.telephone_number,
      email_address: body.email_address
    });

    res.redirect('/test-booking-summary');
  }

  private showTestCandidateDetailsView(res: Response, session: BookTestSession): void {
    const viewModel: TestCandidateDetailsViewModel = {
      test_type: session.test_type,
    };

    res.render('test-candidate-details.html', viewModel);
  }
}
