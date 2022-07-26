import { injectable } from 'inversify';
import { BookSlotRequest } from '../client/types/bookSlotRequest';
import { BookTestSession } from '../services/session/bookTestSessionService';

@injectable()
export class BookSlotRequestMapper {
  public mapToBookSlotRequest(session: BookTestSession): BookSlotRequest {
    return {
      ExtendedSlot: session.extended_test === 'true' ? true : false,
      SpecialRequirements: session.special_requirements_details,
      FirstName: session.first_name,
      Surname: session.surname,
      TelephoneNumber: session.telephone_number,
      EmailAddress: session.email_address,
    }
  }
}
