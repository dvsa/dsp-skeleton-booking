import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { TestType } from '../client/types/referenceTypes';
import { types } from '../ioc/types';
import {
  BookTestSession, BookTestSessionService, SpecialRequirements,
} from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestRequirementsViewModel = {
  test_type: TestType
  extended_test?: string
  special_requirements?: string
  special_requirements_details?: SpecialRequirements[]
};

type TestRequirementsFormModel = {
  extended_test: string
  special_requirements?: string
  special_requirements_details?: SpecialRequirements | SpecialRequirements[]
};

@injectable()
export class TestRequirementsController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-requirements')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req);

    this.logger.info('test requirements session', session);

    this.showRequirementsPage(res, session);
  }

  private post(req: Request, res: Response): void {
    const body: TestRequirementsFormModel = <TestRequirementsFormModel> req.body;

    this.logger.info('body.licence-details', body);

    const session: BookTestSession = this.sessionService.get(req);

    this.sessionService.set(req, {
      ...session,
      extended_test: body.extended_test,
      special_requirements: body.special_requirements,
      special_requirements_details: this.mapSpecialRequirementsDetails(body.special_requirements_details),
    });

    res.redirect('test-location');
  }

  private showRequirementsPage(res: Response, session: BookTestSession): void {
    const viewModel: TestRequirementsViewModel = {
      test_type: session.test_type,
      extended_test: session.extended_test,
      special_requirements: session.special_requirements,
      special_requirements_details: session.special_requirements_details,
    };

    res.render('test-requirements.html', viewModel);
  }

  private mapSpecialRequirementsDetails(specialRequirements: SpecialRequirements | SpecialRequirements[]): SpecialRequirements[] {
    if (!specialRequirements) {
      return []
    }

    if (typeof specialRequirements === 'string') {
      return [specialRequirements]
    }

    return specialRequirements
  }
}
