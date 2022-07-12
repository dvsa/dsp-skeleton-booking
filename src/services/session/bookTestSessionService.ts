import { injectable } from 'inversify';
import { ProductID, TestCentreID } from '../../client/types/referenceTypes';
import { SessionService } from './sessionService';

export type SpecialRequirements = 'dyslexia' | 'missing_limbs';

export type BookTestSession = {
  test_type?: ProductID
  extended_test?: string
  special_requirements?: string
  special_requirements_details?: SpecialRequirements[]
  test_centre?: TestCentreID
  from_date?: string
  to_date?: string
  slot?: string
  test_date?: Date
  first_name?: string
  surname?: string
  telephone_number?: string
  email_address?: string
};

@injectable()
export class BookTestSessionService extends SessionService<BookTestSession> {
  public constructor() { super('book_test'); }
}
