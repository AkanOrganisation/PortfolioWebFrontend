import {LookupFilterType} from "../lookups.graphql";
import {ConnectionFilterType} from "../filters.graphql";

// Input types
////////////////////////////////////////////////////////////////////////////////////////

export type ContactPersonFilterType = {
  firstName?: LookupFilterType<string>;
  lastName?: LookupFilterType<string>;
  email?: LookupFilterType<string>;
  phoneNumber?: LookupFilterType<string>;
}

export type ContactPersonFilterConnectionType = ConnectionFilterType & {
  filter?: ContactPersonFilterType;
}


//////////////////////////////////////////////////////////////////////////////////////////


// Node types
//////////////////////////////////////////////////////////////////////////////////////////
export type ContactPersonNodeType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
}
