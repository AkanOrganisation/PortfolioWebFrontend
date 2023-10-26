import {AddressType} from "../types";

const emptyAddress: AddressType = {
  streetName: "",
  streetNumber: "",
  city: "",
  country: "",
  zipCode: "",
  additional: "",

};

export function getEmptyAddress(): AddressType {
  return JSON.parse(JSON.stringify(emptyAddress));
}
