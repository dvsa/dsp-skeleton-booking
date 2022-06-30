import { Application, Request, Response } from 'express';
import { injectable } from 'inversify';
import { Controller } from './controller';

@injectable()
export class TestBookingConfirmationController implements Controller {
  public attachRoutes(app: Application): void {
    app.route('/test-booking-confirmation')
      .get((req: Request, res: Response) => this.get(req, res));
  }

  private get(req: Request, res: Response): void {
    res.render('test-booking-confirmation.html')
  }
}
