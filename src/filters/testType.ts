import { ProductID } from '../client/types/referenceTypes';

export function displayTestType(product: ProductID) {
  switch (product) {
    case ProductID.car:
      return 'B - Car'
    case ProductID.lorry:
      return 'C - Large goods'
    default:
      break;
  }
}
