import {LookupFilterType} from "../lookups.graphql";
import {AddressFilterType, AddressMutationType, AddressNodeType} from "../location/address.graphql";
import {ConnectionFilterType, PagedQueryResultType} from "../filters.graphql";
import {LocationFilterType, LocationMutationType, LocationNodeType} from "../location/location.graphql";
import {OrganiserNodeType} from "../organiser/organiser.graphql";
import {ClientNodeType} from "../client/client.graphql";
import {StatusConstants} from "../../constants/status.constants";

// Filter Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventsDateTimeFilterType = {
    datetime?: LookupFilterType<Date>;
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
    // dates?: EventsDateTimeFilterType;
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
    description?: HTMLElement;
    address?: AddressNodeType;
    dates?: PagedQueryResultType<EventDateTimeNodeType>;
    organiser?: OrganiserNodeType;
    location?: LocationNodeType;

    edited?: boolean;
}


export type EventDateTimeNodeType = {
    id?: string;
    datetime?: Date;
    freeSlotsAvailable?: boolean;
    freeSlotsCount?: number;
    maxMembers?: number;
    status?: StatusConstants;
    eventDescription?: EventNodeType;
    members?: PagedQueryResultType<EventMemberNodeType>;

    // editedFields
    edited?: boolean;
    editedFields?: { [key: string]: boolean };
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

export type eventPublicQueryType = {
    allEventsClientPublic?: PagedQueryResultType<EventNodeType>;
}

////////////////////////////////////////////////////////////////////////////////////////

// Mutation Types
////////////////////////////////////////////////////////////////////////////////////////
export type EventMutationType = {
    eventId?: string;
    title?: string;
    category?: string;
    description?: HTMLElement;
    address?: AddressMutationType;
    location?: LocationMutationType;
    dateTimes?: EventDateTimeMutationType[];
}

export type EventDateTimeMutationType = {
    datetimeId?: string;
    datetime?: Date;
    status?: StatusConstants;
    maxMembers?: number;
}
