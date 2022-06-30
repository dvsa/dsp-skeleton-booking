import { injectable } from 'inversify';
import { SessionService } from './sessionService';

export type TestType = 'car' | 'large_goods';

export type SpecialRequirements = 'dyslexia' | 'missing_limbs';

export type TestCentre = 'hornchruch' | 'goodmayes' | 'barking';

export type BookTestSession = {
  test_type?: TestType
  extended_test?: string
  special_requirements?: string
  special_requirements_details?: SpecialRequirements[]
  test_centre?: TestCentre
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
