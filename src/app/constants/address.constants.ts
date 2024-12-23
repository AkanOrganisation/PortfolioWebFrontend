import {AddressType} from "../types";
import {AddressFilterType} from "../graphql/location/address.graphql";

const emptyAddress: AddressType = {
  streetName: undefined,
  streetNumber: undefined,
  city: undefined,
  country: undefined,
  postalCode: undefined,
  additional: undefined,

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
  postalCode: {
    exact: undefined,
  }
}


export function getDefaultAddressFilter(): AddressFilterType {
  return JSON.parse(JSON.stringify(DEFAULT_ADDRESS_FILTER));
}



const EmptyLocation = {
  locationLat: undefined,
  locationLng: undefined,
}

export function getEmptyLocation(): any {
  return JSON.parse(JSON.stringify(EmptyLocation));
}
