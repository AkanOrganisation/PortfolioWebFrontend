import {EventsDateTimeFilterConnectionType, EventsFilterConnectionType} from "../graphql/events/events.graphql";
import {getDefaultPaginationFilter} from "./pagination.constants";
import {getDefaultAddressFilter} from "./address.constants";
import {getDefaultLocationFilter} from "./location.constants";


const DEFAULT_ORGANISER_EVENTS_FILTER: EventsFilterConnectionType = {
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

const DEFAULT_EVENTS_FILTER: EventsFilterConnectionType = {
        ...getDefaultPaginationFilter(),
        filter: {
            address: getDefaultAddressFilter(),
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
            dates: {
                datetime: {
                    exact: undefined,
                    lte: undefined,
                    gte: undefined,
                    range: undefined,
                },
                status: {
                    exact: undefined,
                    in: undefined,
                },
                freeSlotsMinCount: {
                    exact: undefined,
                    gte: undefined,
                    lte: undefined,
                },
                maxMembers: {
                    exact: undefined,
                    gte: undefined,
                    lte: undefined,
                }
            },
        }
    }
;


export const DEFAULT_EVENT_DATE_TIMES_FILTER: EventsDateTimeFilterConnectionType = {
    ...getDefaultPaginationFilter(),
    filter: {
        datetime: {
            exact: undefined,
            lte: undefined,
            gte: undefined,
        },
        status: {
            exact: undefined,
            in: undefined,
        },
        freeSlotsMinCount: {
            exact: undefined,
            gte: undefined,
            lte: undefined,
        },
        maxMembers: {
            exact: undefined,
            gte: undefined,
            lte: undefined,
        },
    }
};

export function getDefaultDateTimesFilter(): EventsDateTimeFilterConnectionType {
    return JSON.parse(JSON.stringify(DEFAULT_EVENT_DATE_TIMES_FILTER));
}


export function getDefaultOrganiserEventsFilter(): EventsFilterConnectionType {
    return JSON.parse(JSON.stringify(DEFAULT_ORGANISER_EVENTS_FILTER));
}

export function getDefaultEventsFilter(): EventsFilterConnectionType {
    return JSON.parse(JSON.stringify(DEFAULT_EVENTS_FILTER));
}

