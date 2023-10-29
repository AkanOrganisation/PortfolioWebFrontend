import {LookupFilterType} from "../lookups.graphql";
import {AddressFilterType} from "../location/address.graphql";
import {ConnectionFilterType, PagedQueryResultType} from "../filters.graphql";
import {LocationFilterType} from "../location/location.graphql";

// Input Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventsDateTimeFilterType = {
  freeSlotsAvailable?: LookupFilterType<boolean>;
  datetime?: LookupFilterType<string>;
  freeSlotsMinCount?: LookupFilterType<number>;
  maxMembers?: LookupFilterType<number>;
  status?: LookupFilterType<string>;
};

export type EventsFilterType = {
  address?: AddressFilterType;
  category?: LookupFilterType<string>;
  description?: LookupFilterType<string>;
  title?: LookupFilterType<string>;
  datetime?: EventsDateTimeFilterType;
} & LocationFilterType;


export type EventsFilterConnectionType = ConnectionFilterType & {
  filter?: EventsFilterType;
};
////////////////////////////////////////////////////////////////////////////////////////


// Result Types
// export type MyEventsListResultType = {
//   ownedEvents: PagedQueryResultType<EventListNodeType>;
// }
//
// export type MyEventsAndDateTimesListResultType = {
//   ownedEvents: PagedQueryResultType<EventDateTimesListNodeType>;
// }
////////////////////////////////////////////////////////////////////////////////////////


// Node Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventListNodeType = {
  category: string;
  title: string;
  id: string;
};

export type EventDateTimesListNodeType = EventListNodeType & {
  dates: PagedQueryResultType<{ id: string }>;
}
////////////////////////////////////////////////////////////////////////////////////////
