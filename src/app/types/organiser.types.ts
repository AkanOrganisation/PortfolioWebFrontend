import {AddressType} from "./address.types";
import {ContactPersonType} from "./contact-person.types";


export type OrganiserType = {
  companyName?: string
  registerNumber?: string
  contactPersons?: ContactPersonType[]
  address: AddressType
}
