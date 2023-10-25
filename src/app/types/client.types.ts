import {AddressType} from "./address.types";


export type ClientType = {
  firstName?: string
  lastName?: string
  displayName?: string
  phoneNumber?: string
  address: AddressType
}
