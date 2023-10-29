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
