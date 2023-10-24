import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {Address} from "./address.models";


export class Client {
  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get firstName(): string | undefined {
    return this._firstName;
  }

  set firstName(value: string | undefined) {
    this._firstName = value;
  }

  get lastName(): string | undefined {
    return this._lastName;
  }

  set lastName(value: string | undefined) {
    this._lastName = value;
  }

  get displayName(): string | undefined {
    return this._displayName;
  }

  set displayName(value: string | undefined) {
    this._displayName = value;
  }

  get phoneNumber(): string | undefined {
    return this._phoneNumber;
  }

  set phoneNumber(value: string | undefined) {
    this._phoneNumber = value;
  }

  get address(): Address | undefined {
    return this._address;
  }

  set address(value: Address | undefined) {
    this._address = value;
  }

  private _id: string | undefined;
  private _firstName: string | undefined;
  private _lastName: string | undefined;
  private _displayName: string | undefined;
  private _phoneNumber: string | undefined;
  private _address: Address | undefined;

  success: boolean | undefined;
  loading: boolean | undefined;
  error: any;

  constructor(
    private apollo: Apollo,
    public gqlErrors: GraphQLErrorsService,
  ) {
  }

  createOrUpdateClient() {
    this.gqlErrors.clearErrors();
    this.apollo
    .mutate({
      mutation: gql`
        mutation createOrUpdateClient($client: ClientType!) {
          createOrUpdateClient(
            clientData: {
              phoneNumber: $phoneNumber,
              lastName: $lastName,
              firstName: $firstName,
              displayName: $displayName,
              address: {
                additional: $additional,
                city: $city,
                country: $country,
                streetName: $streetName,
                streetNumber: $streetNumber,
                zipCode: $zipCode
              }
            }
          ) {
            success
            errors {
              field
              messages
            }
            client {
              id
              address {
                id
              }
            }
          }
        }`,
      variables: {
        client: {
          phoneNumber: this.phoneNumber,
          lastName: this.lastName,
          firstName: this.firstName,
          displayName: this.displayName,
          address: {
            additional: this.address?.additional,
            city: this.address?.city,
            country: this.address?.country,
            streetName: this.address?.streetName,
            streetNumber: this.address?.streetNumber,
            zipCode: this.address?.zipCode,
          }
        },
      },
    })
    .subscribe((result: any) => {
      this.gqlErrors.setErrors(result.data.createOrUpdateClient.errors);
      this.id = result.data.createOrUpdateClient.client.id;
      //this.address.id = result.data.createOrUpdateClient.client.address.id;

      this.success = result.data.createOrUpdateClient.success;
      this.loading = result.loading;
      this.error = result.error;
    });
    return this.success;
  }
}
