import { TestType, ServiceTypeID, SlotStatus } from './referenceTypes';

export type SlotResponse = {
  SlotID: string
  StartTime: Date
  EndTime: Date
  TestType: TestType
  ServiceType: ServiceTypeID
  TestCentre: string
  Price: string
  Released: boolean
  Extendable: boolean
  Status: SlotStatus
};
