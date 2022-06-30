/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import {
  Application,
  Request,
  Response,
} from 'express';
import { inject, injectable } from 'inversify';
import { types } from '../ioc/types';
import { BookTestSessionService } from '../services/session/bookTestSessionService';
import { Controller } from './controller';

@injectable()
export class HomeController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/')
      .get((req: Request, res: Response) => this.get(req, res));
  }

  private get(req: Request, res: Response): void {
    this.sessionService.set(req, {});

    res.render('home.html');
  }
}
