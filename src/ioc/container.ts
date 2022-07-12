import { Container } from 'inversify';
import { TestTypeController } from '../controllers/testTypeController';
import { TestRequirementsController } from '../controllers/testRequirementsController';
import { types } from './types';
import { HomeController } from '../controllers/homeController';
import { TestLocationController } from '../controllers/testLocationController';
import { BookTestSessionService } from '../services/session/bookTestSessionService';
import { Logger } from '../util/logger';
import { TestSlotsController } from '../controllers/testSlotsController';
import { TestCandidateDetailsController } from '../controllers/testCandidateDetailsController';
import { TestBookingSummaryController } from '../controllers/testBookingSummaryController';
import { TestBookingConfirmationController } from '../controllers/testBookingConfirmationController';
import { SlotClient } from '../client/slotClient';
import { TestDateController } from '../controllers/testDateController';

const container: Container = new Container();

container.bind<HomeController>(types.HomeController).to(HomeController);

container.bind<TestTypeController>(types.TestTypeController).to(TestTypeController);
container.bind<TestRequirementsController>(types.TestRequirementsController).to(TestRequirementsController);
container.bind<TestLocationController>(types.TestLocationController).to(TestLocationController);
container.bind<TestDateController>(types.TestDateController).to(TestDateController);
container.bind<TestSlotsController>(types.TestSlotsController).to(TestSlotsController);
container.bind<TestCandidateDetailsController>(types.TestCandidateDetailsController).to(TestCandidateDetailsController);
container.bind<TestBookingSummaryController>(types.TestBookingSummaryController).to(TestBookingSummaryController);
container.bind<TestBookingConfirmationController>(types.TestBookingConfirmationController).to(TestBookingConfirmationController);

container.bind<BookTestSessionService>(types.BookTestSessionService).to(BookTestSessionService);

container.bind<SlotClient>(types.SlotClient).to(SlotClient);

container.bind<Logger>(types.Logger).to(Logger);

export { container };
