import { TestType } from '../client/types/referenceTypes';

export function displayTestType(product: TestType) {
  switch (product) {
    case TestType.car:
      return 'B - Car'
    case TestType.lorry:
      return 'C - Large goods'
    default:
      break;
  }
}
