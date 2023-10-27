import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {firstValueFrom} from "rxjs";
import {OrganiserType} from "../types";


export class Organiser {

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
          mutation: gql`
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
            }`,
          variables: {
            organiser
          }
        }));
      this.gqlErrors.setErrors(result.data.createOrUpdateClient.errors);
      this.error = result.error;
      return !!result.data.createOrUpdateClient.success;
    } catch (error) {
      this.error = error;
      return false;
    }
  }
}