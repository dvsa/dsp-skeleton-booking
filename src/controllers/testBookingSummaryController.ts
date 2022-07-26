import { Application, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import moment from 'moment';
import { SlotClient } from '../client/slotClient';
import { BookSlotRequest } from '../client/types/bookSlotRequest';
import { TestType } from '../client/types/referenceTypes';
import { displayTestCentre } from '../filters/testCentre';
import { displayTestType } from '../filters/testType';
import { types } from '../ioc/types';
import { BookSlotRequestMapper } from '../mappers/bookSlotRequestMapper';
import { BookTestSession, BookTestSessionService } from '../services/session/bookTestSessionService';
import { SummaryList, SummaryListRow } from '../types/designSystem';
import { Logger } from '../util/logger';
import { Controller } from './controller';

type TestBookingSummaryViewModel = {
  test_type: TestType
  bookingSummary: SummaryList
}

@injectable()
export class TestBookingSummaryController implements Controller {
  public constructor(
    @inject(types.BookTestSessionService) private sessionService: BookTestSessionService,
    @inject(types.BookSlotRequestMapper) private mapper: BookSlotRequestMapper,
    @inject(types.SlotClient) private client: SlotClient,
    @inject(types.Logger) private logger: Logger,
  ) { }

  public attachRoutes(app: Application): void {
    app.route('/test-booking-summary')
      .get((req: Request, res: Response) => this.get(req, res))
      .post((req: Request, res: Response) => this.post(req, res));
  }

  private get(req: Request, res: Response): void {
    const session: BookTestSession = this.sessionService.get(req)

    this.logger.info('test booking session', session);

    this.showTestBookingSummaryView(res, session);
  }

  private async post(req: Request, res: Response): Promise<void> {
    const session: BookTestSession = this.sessionService.get(req)

    try {
      const bookSlotRequest: BookSlotRequest = this.mapper.mapToBookSlotRequest(session)

      await this.client.bookSlot(session.slot, bookSlotRequest)

      res.redirect('/test-booking-confirmation')
    } catch (err) {
      throw err
    }
  }

  private showTestBookingSummaryView(res: Response, session: BookTestSession): void {
    const viewModel: TestBookingSummaryViewModel = {
      test_type: session.test_type,
      bookingSummary: this.mapBookingSummaryView(session)
    };

    res.render('test-booking-summary.html', viewModel);
  }

  private mapBookingSummaryView(session: BookTestSession): SummaryList {
    this.logger.info('type of extended test', typeof session.extended_test)
    return {
      rows: [
        this.mapSummaryListItem('Test type', displayTestType(session.test_type)),
        this.mapSummaryListItem('Extended test', (session.extended_test === 'true') ? 'Yes': 'No'),
        this.mapSummaryListItem('Special requirements', this.mapSpecialRequirements(session)),
        this.mapSummaryListItem('Test centre', displayTestCentre(session.test_centre)),
        this.mapSummaryListItem('Slot', moment(session.test_date).format('DD-MM-YYYY HH:mm')),
        this.mapSummaryListItem('First name', session.first_name),
        this.mapSummaryListItem('Surname', session.surname),
        this.mapSummaryListItem('Telephone', session.telephone_number),
        this.mapSummaryListItem('Email address', session.email_address),
      ]
    }
  }

  private mapSummaryListItem(key: string, value: string): SummaryListRow {
    return {
      key: {
        text: key
      },
      value: {
        text: value
      }
    }
  }

  private mapSpecialRequirements(session: BookTestSession): string {
    if (session.special_requirements === 'true') {
      const requirements: string[] = session.special_requirements_details.map((requirement) => requirement.charAt(0).toUpperCase() + requirement.slice(1))

      return `Yes ${ requirements.join(',') }`
    } else {
      return 'Not applicable'
    }
  }
}
