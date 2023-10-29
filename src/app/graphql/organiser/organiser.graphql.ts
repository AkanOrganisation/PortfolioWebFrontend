import {AddressNodeType} from "../location/address.graphql";
import {ConnectionFilterType, PagedQueryResultType} from "../filters.graphql";
import {

  EventNodeType,
  EventsFilterConnectionType
} from "../events/events.graphql";
import {
  ContactPersonFilterConnectionType,
  ContactPersonFilterType,
  ContactPersonNodeType
} from "./contact-person.graphql";

// Input Types
////////////////////////////////////////////////////////////////////////////////////////
export type OrganiserFilterType = {
  contactPersons?: ContactPersonFilterConnectionType;
  ownedEvents?: EventsFilterConnectionType;
};

export type OrganiserFilterConnectionType = ConnectionFilterType & {
  filter?: OrganiserFilterType;
}
////////////////////////////////////////////////////////////////////////////////////////


// Node Types
////////////////////////////////////////////////////////////////////////////////////////
export type OrganiserNodeType = {
  id?: string;
  companyName?: string;
  registerNumber?: string;
  address?: AddressNodeType;
  contactPersons?: PagedQueryResultType<ContactPersonNodeType>;
  ownedEvents?: PagedQueryResultType<EventNodeType>;
}
////////////////////////////////////////////////////////////////////////////////////////


// Query Types
////////////////////////////////////////////////////////////////////////////////////////
export type OrganiserPrivateQueryType = {
  organiserPrivate?: OrganiserNodeType;
}

export type OrganiserPublicQueryType = {
  organiserPublic?: OrganiserNodeType;
}

export type AllOrganisersQueryType = {
  allOrganisers?: PagedQueryResultType<OrganiserNodeType>;
}
