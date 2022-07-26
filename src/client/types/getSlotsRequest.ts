import { TestType, ServiceTypeID, TestCentreID } from "./referenceTypes";

export type GetSlotsRequest = {
  StartDate?: Date
  EndDate?: Date
  TestType?: TestType
  ServiceType?: ServiceTypeID
  TestCentre?: TestCentreID
  SpecialAccommodations?: boolean
  ExtraTime?: boolean
  Extended?: boolean
};
