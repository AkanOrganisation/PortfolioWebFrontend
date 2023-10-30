import {AddressType} from "./address.types";
import {ContactPersonType} from "./contact-person.types";
import {EventNodeType} from "../graphql/events/events.graphql";


export type OrganiserType = {
  companyName?: string
  registerNumber?: string
  contactPersons?: ContactPersonType[]
  address: AddressType
  ownedEvents?: { [key: string]: EventNodeType };
}
