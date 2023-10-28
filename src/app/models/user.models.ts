import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService, UserService} from "../services";
import {Injectable} from "@angular/core";
import {firstValueFrom, Observable} from "rxjs";
import {ClientModel} from "./client.models";
import {UserType} from "../types";
import {OrganiserModel} from "./organiser.models";
import {UserPermissions} from "../constants/permissions.constants";


@Injectable({
  providedIn: 'root',
})
export class UserModel {

  error: any;

  client: ClientModel = new ClientModel(this.apollo, this.gqlErrors);
  organiser: OrganiserModel = new OrganiserModel(this.apollo, this.gqlErrors);

  constructor(
    public user: UserService,
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
      if (result.data.userLoginOrOut.success) {
        this.user.logout();
      }
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      return result.data.userLoginOrOut.success;
    } catch (error) {
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
            password: user.password
          },
        }));
      this.user.authenticated = !!result.data.userLoginOrOut.success;
      if (this.user.authenticated) {
        this.user.data.email = user.email;
        result.data.userLoginOrOut.isClient ? this.user.addPermission(UserPermissions.CLIENT) : null;
        result.data.userLoginOrOut.isOrganiser ? this.user.addPermission(UserPermissions.ORGANISER) : null;
      }
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      this.error = result.error;
      return this.user.authenticated;
    } catch (error) {
      this.error = error;
      return false;
    }
  }

  async isAuthenticated() {
    // if (!this.user.authenticated) {
    //   // return false if no localStorage data available
    //   return false;
    // }
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
      this.user.authenticated = result.data.isAuthenticated;
      this.error = result.error;
      return this.user.authenticated;
    } catch
      (error) {
      this.error = error;
      return false;
    }
  }


  async createOrUpdate(
    user: UserType,
    createNewUser: boolean,
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
      this.user.authenticated = !!result.data.createOrUpdateUser.success;
      this.gqlErrors.setErrors(result.data.createOrUpdateUser.errors);
      this.error = result.error;
      if (this.user.authenticated) {
        this.user.updateData(user, createNewUser);
      }
      return this.user.authenticated;
    } catch
      (error) {
      this.error = error;
      return false;
    }
  }


}
