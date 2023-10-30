import {LookupFilterType} from "../lookups.graphql";
import {AddressFilterType, AddressNodeType} from "../location/address.graphql";
import {ConnectionFilterType, PagedQueryResultType} from "../filters.graphql";
import {LocationFilterType, LocationNodeType} from "../location/location.graphql";
import {OrganiserNodeType} from "../organiser/organiser.graphql";
import {ClientNodeType} from "../client/client.graphql";

// Input Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventsDateTimeFilterType = {
  datetime?: LookupFilterType<string>;
  status?: LookupFilterType<string>;
  freeSlotsAvailable?: LookupFilterType<boolean>;
  freeSlotsMinCount?: LookupFilterType<number>;
  maxMembers?: LookupFilterType<number>;
};

export type EventsFilterType = {
  address?: AddressFilterType;
  category?: LookupFilterType<string>;
  description?: LookupFilterType<string>;
  title?: LookupFilterType<string>;
  datetime?: EventsDateTimeFilterType;
  location?: LocationFilterType;
};


export type EventsFilterConnectionType = ConnectionFilterType & {
  filter?: EventsFilterType;
};

export type EventsDateTimeFilterConnectionType = ConnectionFilterType & {
  filter?: EventsDateTimeFilterType;
}


// Node Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventNodeType = {
  category?: string;
  title?: string;
  id?: string;
  description?: string;
  address?: AddressNodeType;
  dates?: PagedQueryResultType<EventDateTimeNodeType>;
  organiser?: OrganiserNodeType;
  location?: LocationNodeType;
}


export type EventDateTimeNodeType = {
  id?: string;
  datetime?: string;
  freeSlotsAvailable?: boolean;
  freeSlotsCount?: number;
  maxMembers?: number;
  status?: string;
  eventDescription?: EventNodeType;
  members?: PagedQueryResultType<EventMemberNodeType>;
}


export type EventMemberNodeType = {
  id?: string;
  client?: ClientNodeType;
  status?: string;
}
////////////////////////////////////////////////////////////////////////////////////////


// Query Types
////////////////////////////////////////////////////////////////////////////////////////
export type eventPrivateQueryType = {
  eventOrganiserPrivate?: EventNodeType;
}

////////////////////////////////////////////////////////////////////////////////////////
