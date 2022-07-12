import { ProductID, ServiceTypeID, TestCentreID } from "./referenceTypes";

export type GetSlotsRequest = {
  StartDate?: Date
  EndDate?: Date
  Product?: ProductID
  ServiceType?: ServiceTypeID
  TestCentre?: TestCentreID
};
