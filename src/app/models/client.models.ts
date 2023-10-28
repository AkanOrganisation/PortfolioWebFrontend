import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {firstValueFrom} from "rxjs";
import {ClientType} from "../types";


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
}
