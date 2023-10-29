// Address Filter Types
import {LookupFilterType} from "../lookups.graphql";

export type AddressFilterType = {
  city?: LookupFilterType<string>;
  country?: LookupFilterType<string>;
  zipCode?: LookupFilterType<string>;
};
