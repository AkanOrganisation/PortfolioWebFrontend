import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {Injectable} from "@angular/core";
import {
  eventPublicQueryType,
  EventsDateTimeFilterConnectionType,
  EventsFilterConnectionType,
  EventsFilterType
} from "../graphql/events/events.graphql";

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

  getEventsList(eventsFilter: EventsFilterConnectionType, datesFilter: EventsDateTimeFilterConnectionType) {
    const {
      first: datesFirst,
      last: datesLast,
      after: datesAfter,
      before: datesBefore,
      filter: datesFilterFilter
    } = datesFilter;

    return this.apollo
      .watchQuery<eventPublicQueryType>({
        query: EVENTS_LIST_QUERY,
        variables: {
          ...eventsFilter,
          datesFirst,
          datesLast,
          datesAfter,
          datesBefore,
          datesFilter: datesFilterFilter
        },
      }).valueChanges;
  }


  getEventById(id: string | undefined) {
    return this.apollo
      .watchQuery<eventPublicQueryType>({
        query: EVENT_DETAIL_QUERY,
        variables: {
          id: id
        }
      }).valueChanges;
  }
}


const EVENTS_LIST_QUERY = gql`
  query allEventsClientPublic(
    $first: Int = 100,
    $after: String,
    $before: String,
    $last: Int,
    $filter: EventDetailPublicEventDetailFilterPublicFilterInputType,
    $datesFirst: Int,
    $datesAfter: String,
    $datesBefore: String,
    $datesLast: Int,
    $datesFilter: EventDateTimePublicEventDateTimeFilterPublicFilterInputType
  ) {
    allEventsClientPublic(
      first: $first,
      after: $after,
      before: $before,
      last: $last,
      filter: $filter
    ){
      edges {
        node {
          location
          title
          category
          id
          dates(
            first: $datesFirst,
            after: $datesAfter,
            before: $datesBefore,
            last: $datesLast,
            filter: $datesFilter
          ) {
            edges {
              cursor
              node {
                id
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


const EVENT_DETAIL_QUERY = gql`
    query eventClientPublic(
        $id: ID!)
    {
        eventClientPublic(
            id: $id
        ) {
            description
            address{
                city
                streetName
                streetNumber
                postalCode
                country
                additional
            }
            dates {
                edges {
                    node {
                        id
                        datetime
                        freeSlotsCount
                        maxMembers
                        status
                    }
                }
            }
        }
    }
`;


