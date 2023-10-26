import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services";
import {Injectable} from "@angular/core";
import {firstValueFrom} from "rxjs";
import {Client} from "./client.models";
import {UserType} from "../types";
import {Organiser} from "./organiser.models";


@Injectable({
  providedIn: 'root',
})
export class User {

  data: UserType = {};

  authenticated: boolean = false;
  client: Client = new Client(this.apollo, this.gqlErrors);
  organiser: Organiser = new Organiser(this.apollo, this.gqlErrors);
  isClient: boolean = false;
  isOrganiser: boolean = false;

  success: boolean = false;
  loading = false;
  error: any;

  constructor(
    private apollo: Apollo,
    public gqlErrors: GraphQLErrorsService,
  ) {
  }

  async logout() {
    try {
      this.gqlErrors.clearErrors();
      const result: any = await firstValueFrom(
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
        }));
      this.authenticated = (result.data.userLoginOrOut.success == true) ? false : this.authenticated;
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      this.loading = result.loading;
      this.error = result.error;
      return this.authenticated;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async login(user: UserType): Promise<boolean> {
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
            email: user.email,
            password: user.password,
          },
        }));
      this.authenticated = !!result.data.userLoginOrOut.success;
      this.isClient = result.data.userLoginOrOut.isClient;
      this.isOrganiser = result.data.userLoginOrOut.isOrganiser;
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      this.loading = result.loading;
      this.error = result.error;
      return this.authenticated;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async isAuthenticated() {
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


  async createOrUpdate(
    user: UserType,
    createNewUser:boolean,
  ):
    Promise<boolean> {
    this.gqlErrors.clearErrors();
    try {
      const result: any = await firstValueFrom(
        this.apollo.mutate({
          mutation: gql`
              mutation CreateUser($email: String!, $password: String!, $password2: String, $createNewUser: Boolean) {
                  createOrUpdateUser(
                      userData: {
                          email: $email,
                          newPassword: $password
                          oldPassword: $password2
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
            email: user.email,
            password: user.password,
            password2: user.password2,
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
