import {AddressType} from "../types";
import {AddressFilterType} from "../graphql/location/address.graphql";

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


const DEFAULT_ADDRESS_FILTER = {
  city: {
    exact: undefined,
  },
  country: {
    exact: undefined,
  },
  zipCode: {
    exact: undefined,
  }
}


export function getDefaultAddressFilter(): AddressFilterType {
  return JSON.parse(JSON.stringify(DEFAULT_ADDRESS_FILTER));
}
