import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {firstValueFrom} from "rxjs";
import {ClientType} from "../types";
import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class ClientModel {

    success: boolean = false;
    loading: boolean = false;
    error: any;

    constructor(
        private apollo: Apollo,
        public gqlErrors: GraphQLErrorsService,
    ) {
    }

    async createOrUpdateClient(client: ClientType): Promise<boolean> {
        try {
            this.gqlErrors.clearErrors();
            const result: any = await firstValueFrom(
                this.apollo
                .mutate({
                    mutation: gql`
                        mutation createOrUpdateClient($client: ClientInputType!) {
                            createOrUpdateClient(
                                clientData: $client
                            ) {
                                success
                                errors {
                                    field
                                    messages
                                }
                            }
                        }`,
                    variables: {
                        client
                    }
                }));
            this.gqlErrors.setErrors(result.data.createOrUpdateClient.errors);
            this.success = !!result.data.createOrUpdateClient.success;
            this.loading = result.loading;
            this.error = result.error;
            return this.success;
        } catch (error) {
            this.error = error;
            return false;
        }
    }

    getUpcomingEvents() {
        return this.apollo.watchQuery({
            query: CLIENT_EVENTS_QUERY,
            variables: {
                first: 100,
                filter: {
                    eventDatetime: {
                        datetime: {
                            gte: new Date().toISOString()
                        }
                    },
                    status: {
                        in: ['booked_confirmed', 'booked_unconfirmed']
                    }
                }
            }
        }).valueChanges;
    }


    takeEvent(id: string) {
        return this.apollo.mutate({
                mutation: TAKE_OR_EXIT_EVENT_MUTATION,
                variables: {
                    id: id
                }
            }
        )
    }

    exitEvent(id: string) {
        return this.apollo.mutate({
                mutation: TAKE_OR_EXIT_EVENT_MUTATION,
                variables: {
                    id: id,
                    exit: true
                }
            }
        )
    }
}


const TAKE_OR_EXIT_EVENT_MUTATION = gql`
    mutation takeEvent(
        $id: ID!
        $exit: Boolean! = false
    ){
        clientTakeOrExitEvent(
            eventDatetimeId: $id
            exitEvent: $exit
        ) {
            success
        }
    }
`;

const CLIENT_EVENTS_QUERY = gql`
    query client(
        $first: Int! = 100
        $last: Int
        $after: String
        $before: String
        $filter: EventMemberPrivateEventMemberFilterFilterInputType
    ) {
        clientPrivate {
            events(
                first: $first
                last: $last
                after: $after
                before: $before
                filter: $filter
            ) {
                edges {
                    node {
                        eventDatetime {
                            datetime
                            id
                            eventDescription {
                                title
                                category
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
    }
`;
