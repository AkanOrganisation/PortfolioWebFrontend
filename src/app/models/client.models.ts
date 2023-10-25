import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {Address} from "./address.models";
import {firstValueFrom} from "rxjs";
import {ClientType} from "../types";


export class Client {
  get id(): string {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }

  get firstName(): string {
    return this._firstName;
  }

  set firstName(value: string) {
    this._firstName = value;
  }

  get lastName(): string {
    return this._lastName;
  }

  set lastName(value: string) {
    this._lastName = value;
  }

  get displayName(): string {
    return this._displayName;
  }

  set displayName(value: string) {
    this._displayName = value;
  }

  get phoneNumber(): string {
    return this._phoneNumber;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  get address(): Address {
    return this._address;
  }

  set address(value: Address) {
    this._address = value;
  }

  private _id: string = "";
  private _firstName: string = "";
  private _lastName: string = "";
  private _displayName: string = "";
  private _phoneNumber: string = "";
  private _address: Address = new Address();

  success: boolean | undefined;
  loading: boolean | undefined;
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
