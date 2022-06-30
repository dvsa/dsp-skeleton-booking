import { TestType } from '../services/session/bookTestSessionService';

export function displayTestType(testType: TestType) {
  if (testType === 'car') {
    return 'B - Car'
  } else if (testType === 'large_goods') {
    return 'C - Large goods'
  }
}
