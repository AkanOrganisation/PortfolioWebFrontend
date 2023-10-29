import {EventsFilterConnectionType} from "../graphql/events/events.graphql";
import {getDefaultPaginationFilter} from "./pagination.constants";
import {getDefaultAddressFilter} from "./address.constants";
import {getDefaultLocationFilter} from "./location.constants";


const DEFAULT_EVENTS_FILTER: EventsFilterConnectionType = {
  ...getDefaultPaginationFilter(),
  filter: {
    address: {
      ...getDefaultAddressFilter(),
    },
    category: {
      exact: undefined,
      in: undefined,
    },
    description: {
      exact: undefined,
      icontains: undefined,
    },
    title: {
      exact: undefined,
      icontains: undefined,
    },
    organiser: {
      exact: undefined,
    },
    location: getDefaultLocationFilter(),
  }
};


export function getDefaultEventsFilter(): EventsFilterConnectionType {
  return JSON.parse(JSON.stringify(DEFAULT_EVENTS_FILTER));
}



