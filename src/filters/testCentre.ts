import { TestCentreID } from '../client/types/referenceTypes';

export function displayTestCentre(testCentre: TestCentreID) {
  switch (testCentre) {
    case TestCentreID.barking:
      return 'Barking'
    case TestCentreID.hornchurch:
      return 'Hornchurch'
    case TestCentreID.goodmayes:
      return 'Goodmayes'
    default:
      break;
  }
}
