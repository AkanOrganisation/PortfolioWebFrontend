import {ClientType} from "./client.types";
import {AddressType, LocationType} from "./address.types";
import {OrganiserType} from "./organiser.types";

export type EventDateTimeType = {
    id?: string;
    datetime?: Date;
    freeSlotsAvailable?: boolean;
    freeSlotsCount?: number;
    maxMembers?: number;
    status?: string;
    members?: EventMemberType[];
}

export type EventMemberType = {
    id?: string;
    client?: ClientType;
    status?: string;
}

export type EventType = {
    category?: string;
    title?: string;
    eventId?: string;
    description?: HTMLElement;
    address?: AddressType;
    location?: LocationType;
    datesTimes?: EventDateTimeType[];
    organiser?: OrganiserType;
}
