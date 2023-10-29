import {AddressNodeType} from "../location/address.graphql";
import {EventNodeType} from "../events/events.graphql";
import {PagedQueryResultType} from "../filters.graphql";


// Node types
//////////////////////////////////////////////////////////////////////////////////////////
export type ClientNodeType = {
  id?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  displayName?: string;
  address?: AddressNodeType;
  events?: PagedQueryResultType<EventNodeType>;
}

//////////////////////////////////////////////////////////////////////////////////////////
