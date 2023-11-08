import {Apollo, gql, TypedDocumentNode} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {firstValueFrom} from "rxjs";
import {OrganiserType} from "../types";
import {Injectable} from "@angular/core";
import {
    OrganiserFilterType,
    OrganiserNodeType,
    OrganiserPrivateQueryType
} from "../graphql/organiser/organiser.graphql";
import {
    EventDateTimeMutationType,
    EventMutationType,
    EventNodeType,
    eventPrivateQueryType
} from "../graphql/events/events.graphql";
import {EventType} from "../types/event.types";

@Injectable({
    providedIn: 'root',
})
export class OrganiserModel {

    error: any;

    constructor(
        private apollo: Apollo,
        public gqlErrors: GraphQLErrorsService,
    ) {
    }

    async createOrUpdateOrganiser(organiser: OrganiserType): Promise<boolean> {
        try {
            this.gqlErrors.clearErrors();
            const result: any = await firstValueFrom(
                this.apollo
                    .mutate({
                        mutation: CREATE_OR_UPDATE_ORGANISER_MUTATION,
                        variables: {
                            organiser
                        }
                    }));
            this.gqlErrors.setErrors(result.data.createOrUpdateOrganiser.errors);
            this.error = result.error;
            return !!result.data.createOrUpdateOrganiser.success;
        } catch (error) {
            this.error = error;
            return false;
        }
    }


    getOwnedEventsList(variables: OrganiserFilterType) {
        return this.apollo
            .watchQuery<OrganiserPrivateQueryType>({
                query: EVENTS_LIST_QUERY,
                variables: {...variables.ownedEvents},
            }).valueChanges;
    }

    getEventDetails(id: string) {
        return this.apollo
            .watchQuery<eventPrivateQueryType>({
                query: EVENT_DETAILS_QUERY,
                variables: {id},
            }).valueChanges;

    }

    async createOrUpdateEvents(eventsRaw: EventNodeType[]) {
        const events = this.cleanEvents(eventsRaw);
        try {
            this.gqlErrors.clearErrors();
            const result: any = await firstValueFrom(
                this.apollo
                    .mutate({
                        mutation: CREATE_OR_UPDATE_EVENTS_MUTATION,
                        variables: {
                            events
                        }
                    }));
            this.gqlErrors.setErrors(result.data.createOrUpdateEvents.errors);
            this.error = result.error;
            return result.data.createOrUpdateEvents;
        } catch (error) {
            this.error = error;
            return false;
        }
    }

    private cleanEvents(events: EventNodeType[]) {
        return events.map((event) => {
                const eventCleaned: EventMutationType = {
                    eventId: event.id,
                    category: event.category,
                    title: event.title,
                    description: event.description,
                    address: {
                        country: event.address?.country,
                        city: event.address?.city,
                        streetName: event.address?.streetName,
                        streetNumber: event.address?.streetNumber,
                        postalCode: event.address?.postalCode,
                        additional: event.address?.additional,
                    },
                    location: event.location?.coordinates ? {lat: event.location?.coordinates[0], lng: event.location?.coordinates[1]} : undefined,
                    dateTimes: event.dates?.edges.map((edge) : EventDateTimeMutationType => {
                        return {
                            datetimeId: edge.node.id,
                            datetime: edge.node.datetime,
                            maxMembers: edge.node.maxMembers,
                            status: edge.node.status,

                        }
                    }),

                };
                return eventCleaned;
            }
        );

    }
}


const EVENTS_LIST_QUERY: TypedDocumentNode<OrganiserNodeType, OrganiserFilterType> = gql`
    query EventsListQuery(
        $first: Int = 100
        $after: String
        $before: String
        $last: Int
        $filter: EventDetailOrganiserPrivateEventDetailFilterOrganiserPrivateFilterInputType) {
        organiserPrivate {
            id
            ownedEvents(
                first: $first
                after: $after
                before: $before
                last: $last
                filter: $filter
            )
            {
                edges {
                    node {
                        category
                        title
                        id
                    }
                    cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                    hasPreviousPage
                    startCursor
                }
            }
        }
    }
`;


const EVENT_DETAILS_QUERY: TypedDocumentNode<EventNodeType> = gql`
    query EventsListQuery(
        $id: ID!) {
        eventOrganiserPrivate(id: $id) {
            address {
                additional
                city
                country
                id
                streetName
                streetNumber
                postalCode
            }
            category
            description
            id
            location
            title
            dates {
                edges {
                    node {
                        datetime
                        freeSlotsAvailable
                        freeSlotsCount
                        maxMembers
                        id
                        status
                        members {
                            edges {
                                node {
                                    status
                                    id
                                    client {
                                        displayName
                                        firstName
                                        lastName
                                        id
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

const CREATE_OR_UPDATE_ORGANISER_MUTATION = gql`
    mutation createOrUpdateOrganiser($organiser: OrganiserInputType!) {
        createOrUpdateOrganiser(
            organiserData: $organiser
        ) {
            success
            errors {
                field
                messages
            }
        }
    }`


const CREATE_OR_UPDATE_EVENTS_MUTATION = gql`
    mutation createOrUpdateEvents($events: [EventDescriptionInputType]!) {
        createOrUpdateEvents(
            eventsData: $events
        ) {
            success
            errors {
                field
                messages
            }
            events {
                id
                dates {
                    edges {
                        cursor
                        node {
                            id
                            datetime
                            maxMembers
                            status
                        }
                    }
                    pageInfo {
                        startCursor
                        hasPreviousPage
                        hasNextPage
                        endCursor
                    }
                }
            }
        }
    }`

