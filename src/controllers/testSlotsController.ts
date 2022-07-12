import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import moment from 'moment';
import { SlotClient } from '../client/slotClient';
import { GetSlotsRequest } from '../client/types/getSlotsRequest';
import { SlotResponse } from '../client/types/getSlotsResponse';
import { ProductID, ServiceTypeID } from '../client/types/referenceTypes';
import { types } from '../ioc/types';
import { BookTestSession, BookTestSessionService } from '../services/session/bookTestSessionService';
import { Checkbox } from '../types/designSystem';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestSlotFormModel = {
  slot: string
};

type TestSlotsViewModel = {
  test_type: ProductID
  slots: Checkbox[]
};

@injectable()
export class TestSlotsController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.SlotClient) private client: SlotClient,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-slots')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private async get(req: Request, res: Response): Promise<void> {
    const session: BookTestSession = this.sessionService.get(req)
    this.logger.info('test slots session', session);

    try {
      const getSlotsRequest: GetSlotsRequest = this.generateGetSlotsRequest(session)
      const slots: SlotResponse[] = await this.client.getSlots(getSlotsRequest);

      this.logger.info('slot response', slots);

      this.showTestSlotView(res, session, slots);
    } catch (error) {
      this.logger.error(error)
      throw error
    }
  }

  private async post(req: Request, res: Response): Promise<void> {
    const body: TestSlotFormModel = <TestSlotFormModel>req.body;

    this.logger.info('test slots body', body);

    const slots: SlotResponse = await this.client.getSlot(body.slot);

    const session: BookTestSession = this.sessionService.get(req);

    this.sessionService.set(req, {
      ...session,
      slot: body.slot,
      test_date: slots.StartTime
    });

    await this.client.reserveSlot(body.slot);

    res.redirect('/test-candidate-details');
  }


  private showTestSlotView(res: Response, session: BookTestSession, slots: SlotResponse[]): void {
    const vm: Checkbox[] = []

    const groupedSlots: Record<string, SlotResponse[]> = slots.reduce(this.groupByStartTime, {})

    for (const key in groupedSlots) {
      if (Object.prototype.hasOwnProperty.call(groupedSlots, key)) {
        const slots: SlotResponse[] = groupedSlots[key];
        vm.push(this.getSlotViewModel(key, slots))
      }
    }

    const viewModel: TestSlotsViewModel = {
      test_type: session.test_type,
      slots: vm
    };

    res.render('test-slots.html', viewModel);
  }

  private getSlotViewModel(date: string, slots: SlotResponse[]): Checkbox {
    return {
      text: `${moment(date).format('DD-MM-YYYY HH:mm')} - ${slots.length} slots remaining`,
      hint: {
        text: `£${slots[0].Price}`
      },
      value: slots[0].SlotID,
    }
  }

  private generateGetSlotsRequest(session: BookTestSession): GetSlotsRequest {
    const request: GetSlotsRequest = {}

    request.TestCentre = session.test_centre
    request.StartDate = moment(session.from_date).startOf('day').toDate();
    request.EndDate = moment(session.to_date).endOf('day').toDate();
    request.ServiceType = ServiceTypeID.standard

    return request
  }

  private groupByStartTime(groupedSlots: Record<string, SlotResponse[]>, slot: SlotResponse): Record<string, SlotResponse[]> {
    const key: string = moment(slot.StartTime).toISOString();

    if (groupedSlots[key]) {
      groupedSlots[key].push(slot)
    } else {
      groupedSlots[key] = [slot]
    }

    return groupedSlots
  }
}
