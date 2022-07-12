import { ProductID, ServiceTypeID } from './referenceTypes';

export type SlotResponse = {
  SlotID: string
  StartTime: Date
  EndTime: Date
  Service: ProductID
  ServiceType: ServiceTypeID
  TestCentre: string
  Price: string
  Booked: boolean
  Reserved: boolean
};
