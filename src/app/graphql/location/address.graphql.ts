// Address Filter Types
import {LookupFilterType} from "../lookups.graphql";


// Input Types
////////////////////////////////////////////////////////////////////////////////////////
export type AddressFilterType = {
    city?: LookupFilterType<string>;
    country?: LookupFilterType<string>;
    postalCode?: LookupFilterType<string>;
};
////////////////////////////////////////////////////////////////////////////////////////


// Result Types
////////////////////////////////////////////////////////////////////////////////////////
export type AddressNodeType = {
    id?: string;
    city?: string;
    country?: string;
    postalCode?: string;
    streetName?: string;
    streetNumber?: string;
    additional?: string;
}
////////////////////////////////////////////////////////////////////////////////////////
