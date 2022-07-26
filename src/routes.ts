import { Application } from 'express';
import { Controller } from './controllers/controller';
import { types } from './ioc/types';
import { container } from './ioc/container';

function attachRoutes(app: Application): void {
  const controllers: Controller[] = [
    getController(types.HomeController),

    getController(types.TestTypeController),
    getController(types.TestRequirementsController),
    getController(types.TestLocationController),
    getController(types.TestSlotsController),
    getController(types.TestCandidateDetailsController),
    getController(types.TestBookingSummaryController),
    getController(types.TestBookingConfirmationController),
  ];

  controllers.forEach((controller) => controller.attachRoutes(app));
}

function getController(type: symbol): Controller {
  return container.get<Controller>(type);
}

export { attachRoutes };
