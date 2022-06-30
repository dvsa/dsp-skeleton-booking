import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import moment from 'moment';
import { types } from '../ioc/types';
import { BookTestSession, BookTestSessionService, TestType } from '../services/session/bookTestSessionService';
import { Checkbox } from '../types/designSystem';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestSlotFormModel = {
  slot: string
};

type TestSlotsViewModel = {
  test_type: TestType
  slots: Checkbox[]
};

type TestSlot = {
  test_date: Date
  price: string
  id: string
};

@injectable()
export class TestSlotsController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-slots')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req)

    this.logger.info('test slots session', session);

    this.showTestSlotView(res, session);
  }

  private post(req: Request, res: Response): void {
    const body: TestSlotFormModel = <TestSlotFormModel>req.body;

    this.logger.info('test slots body', body);

    const slots: TestSlot[] = this.getTestSlots()

    const session: BookTestSession = this.sessionService.get(req)

    this.sessionService.set(req, {
      ...session,
      slot: body.slot,
      test_date: slots.find((slot) => slot.id === body.slot).test_date
    })

    res.redirect('/test-candidate-details');
  }

  private showTestSlotView(res: Response, session: BookTestSession): void {
    const viewModel: TestSlotsViewModel = {
      test_type: session.test_type,
      slots: this.getSlotViewModel(),
    };

    res.render('test-slots.html', viewModel);
  }

  private getSlotViewModel(): Checkbox[] {
    const slots: TestSlot[] = this.getTestSlots();

    return slots.map((slot) => ({
      text: moment(slot.test_date).format('DD-MM-YYYY HH:mm'),
      hint: {
        text: slot.price
      },
      value: slot.id,
    }));
  }

  private getTestSlots(): TestSlot[] {
    return [{
      test_date: new Date('2022-06-28 9:00'),
      price: '£65',
      id: '1234-1234-1234-1234',
    }, {
      test_date: new Date('2022-06-28 10:00'),
      price: '£65',
      id: '1234-4567-5678',
    }];
  }
}
