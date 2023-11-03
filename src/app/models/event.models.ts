import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {Injectable} from "@angular/core";
import {eventPublicQueryType, EventsFilterConnectionType, EventsFilterType} from "../graphql/events/events.graphql";

@Injectable({
    providedIn: 'root',
})
export class EventModel {

    success: boolean = false;
    loading: boolean = false;
    error: any;

    constructor(
        private apollo: Apollo,
        public gqlErrors: GraphQLErrorsService,
    ) {
    }

    getEventsList(eventsFilter: EventsFilterConnectionType, eventsDateTimeFilter: EventsFilterConnectionType) {
        return this.apollo
            .watchQuery<eventPublicQueryType>({
                query: EVENTS_LIST_QUERY,
                variables: {
                    ...eventsFilter,
                    // ...eventsDateTimeFilter
                },
            }).valueChanges;
    }


}


const EVENTS_LIST_QUERY = gql`
    query allEventsClientPublic(
        $first: Int = 100,
        $after: String,
        $before: String,
        $last: Int,
        $filter: EventDetailPublicEventDetailFilterPublicFilterInputType) {
        allEventsClientPublic(
            first: $first,
            after: $after,
            before: $before,
            last: $last,
            filter: $filter
        ){
            edges {
                node {
                    description
                    location
                    title
                    category
                    id
                    address {
                        additional
                        city
                        country
                        postalCode
                        streetName
                        streetNumber
                    }
                    organiser {
                        companyName
                        id
                        registerNumber
                    }
                    dates {
                        edges {
                            cursor
                            node {
                                datetime
                                freeSlotsAvailable
                                freeSlotsCount
                                maxMembers
                                id
                                status
                            }
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                            hasPreviousPage
                            startCursor
                        }
                    }
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
`;
