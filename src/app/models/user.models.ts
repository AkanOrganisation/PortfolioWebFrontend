import {UserType} from "../types";
import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services/graphql/graphql.errors";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root',
})
export class User {

  get id(): string | undefined {
    return this._id;
  }

  set id(value: string | undefined) {
    this._id = value;
  }

  get email(): string | undefined {
    return this._email;
  }

  set email(value: string | undefined) {
    this._email = value;
  }

  get password(): string | undefined {
    let password = this._password;
    this.password = undefined;
    return password;
  }

  set password(value: string | undefined) {
    this._password = value;
  }

  get password2(): string | undefined {
    let password = this._password2;
    this.password2 = undefined;
    return password;
  }

  set password2(value: string | undefined) {
    this._password2 = value;
  }

  get authenticated(): boolean | undefined {
    return this._authenticated;
  }

  set authenticated(value: boolean | undefined) {
    this._authenticated = value;
  }

  private _id: string | undefined;
  private _email: string | undefined;
  private _password: string | undefined;
  private _password2: string | undefined;
  private _authenticated: boolean | undefined;

  success: boolean | undefined;
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
        this.authenticated = (result.data.userLoginOrOut.success == true) ? false : this.authenticated;
        this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
        this.loading = result.loading;
        this.error = result.error;
      }
    );
  }

  login() {
    this.gqlErrors.clearErrors();
    this.apollo
    .mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          userLoginOrOut(email: $email, password: $password) {
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
    })
    .subscribe(
      (result: any) => {
        this.authenticated = result.data.userLoginOrOut.success;
        this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
        this.loading = result.loading;
        this.error = result.error;
      }
    );
    return this.authenticated;
  }

  isAuthenticated() {
    this.apollo
    .watchQuery({
      query: gql`
        query {
          isAuthenticated
        }
      `,
    })
    .valueChanges.subscribe((result: any) => {
      this.authenticated = !!(result.data.isAuthenticated);
      this.loading = result.loading;
      this.error = result.error;
    });
    return this.authenticated;
  }

  createOrUpdate(createNewUser: boolean) {
    this.gqlErrors.clearErrors();
    this.apollo
    .mutate({
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
    })
    .subscribe(
      (result: any) => {
        this.success = result.data.createOrUpdateUser.success;
        this.loading = result.loading;
        this.gqlErrors.setErrors(result.data.createOrUpdateUser.errors);
        this.error = result.error;
      });
  }


}
