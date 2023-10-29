import {LookupFilterType} from "../lookups.graphql";
import {AddressFilterType} from "../location/address.graphql";
import {ConnectionFilterType, PagedQueryResultType} from "../filters.graphql";
import {LocationFilterType} from "../location/location.graphql";
import {EventDateTimesListNodeType, EventListNodeType, EventsFilterConnectionType} from "../events/events.graphql";

// Input Types
////////////////////////////////////////////////////////////////////////////////////////
export type OrganiserFilterType = {
  //contactPersons
  ownedEvents?: EventsFilterConnectionType;
};


////////////////////////////////////////////////////////////////////////////////////////


// Result Types
export type OrganiserPrivateResultType = {
  organiserPrivate: {
    ownedEvents: PagedQueryResultType<EventListNodeType>;
  }
}

export type MyEventsAndDateTimesListResultType = {
  ownedEvents: PagedQueryResultType<EventDateTimesListNodeType>;
}
////////////////////////////////////////////////////////////////////////////////////////


// Node Types
////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////
