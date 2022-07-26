import { TestType } from "./referenceTypes";

export type ReserveSlotRequest = {
  ExtendedSlot: boolean
  SpecialRequirements: string[]
  TestType: TestType
};