import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {Client} from "./client.models";


@Injectable({
  providedIn: 'root',
})
export class User {
  get isClient(): boolean {
    return this._isClient;
  }

  set isClient(value: boolean) {
    this._isClient = value;
  }

  get isOrganiser(): boolean {
    return this._isOrganiser;
  }

  set isOrganiser(value: boolean) {
    this._isOrganiser = value;
  }

  get client(): Client {
    return this._client;
  }

  set client(value: Client) {
    this._client = value;
  }

  get id(): string {
    return this._id;
  }

  set id(value: string ) {
    this._id = value;
  }

  get email(): string  {
    return this._email;
  }

  set email(value: string ) {
    this._email = value;
  }

  get password(): string  {
    return this._password;
  }

  set password(value: string ) {
    this._password = value;
  }

  get password2(): string  {
    return this._password2;
  }

  set password2(value: string ) {
    this._password2 = value;
  }

  get authenticated(): boolean {
    return this._authenticated;
  }

  set authenticated(value: boolean) {
    this._authenticated = value;
  }

  private _id: string = "";
  private _email: string = "";
  private _password: string = "";
  private _password2: string = "";

  private _authenticated: boolean = false;
  private _client: Client = new Client(this.apollo, this.gqlErrors);
  private _isClient: boolean = false;
  private _isOrganiser: boolean = false;


  success: boolean = false;
  loading = false;
  error: any;

  constructor(
    private apollo: Apollo,
    public gqlErrors: GraphQLErrorsService,
  ) {
  }

  logout() {
    this.apollo
    .mutate({
      mutation: gql`
        mutation {
          userLoginOrOut( logout: true) {
            success
            errors{
              field
              messages
            }
          }
        }
      `,
    })
    .subscribe(
      (result: any) => {
        this.authenticated = (result.data.userLoginOrOut.success == true) ? true : this.authenticated;
        this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
        this.loading = result.loading;
        this.error = result.error;
      }
    );
  }

  async login(): Promise<boolean> {
    try {
      this.gqlErrors.clearErrors();
      const result: any = await firstValueFrom(
        this.apollo
        .mutate({
          mutation: gql`
            mutation Login($email: String!, $password: String!) {
              userLoginOrOut(email: $email, password: $password) {
                isClient
                isOrganiser
                success
                errors {
                  field
                  messages
                }
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
          },
        }));
      this.authenticated = !!result.data.userLoginOrOut.success;
      this.isClient = !!result.data.userLoginOrOut.isClient;
      this.isOrganiser = !!result.data.userLoginOrOut.isOrganiser;
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      this.loading = result.loading;
      this.error = result.error;
      return this.authenticated;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async isAuthenticated()
    :
    Promise<boolean> {
    try {
      const result
      :
      any = await firstValueFrom(
        this.apollo.watchQuery({
          query: gql`
            query {
              isAuthenticated
            }
          `,
        }).valueChanges
      );
      this.authenticated = !!(result.data.isAuthenticated);
      return this.authenticated;
    } catch
      (error) {
      this.error = error;
      return this.authenticated;
    }
  }


  async createOrUpdate(createNewUser
                         :
                         boolean
  ):
    Promise<boolean> {
    this.gqlErrors.clearErrors();
    try {
      const result
      :
      any = await firstValueFrom(
        this.apollo.mutate({
          mutation: gql`
            mutation CreateUser($email: String!, $password: String!, $createNewUser: Boolean) {
              createOrUpdateUser(
                userData: {
                  email: $email,
                  newPassword: $password
                },
                createNewUser: $createNewUser) {
                errors {
                  field
                  messages
                }
                success
              }
            }
          `,
          variables: {
            email: this.email,
            password: this.password,
            createNewUser: createNewUser,
          }
        }));
      this.success = !!result.data.createOrUpdateUser.success;
      this.loading = result.loading;
      this.gqlErrors.setErrors(result.data.createOrUpdateUser.errors);
      this.error = result.error;
      return this.success;
    } catch
      (error) {
      this.error = error;
      return false;
    }
  }
}
