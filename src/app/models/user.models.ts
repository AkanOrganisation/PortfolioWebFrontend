import {Apollo, gql} from "apollo-angular";
import {GraphQLErrorsService} from "../services";
import {Injectable} from "@angular/core";
import {BehaviorSubject, firstValueFrom, Observable} from "rxjs";
import {Client} from "./client.models";
import {UserType} from "../types";
import {Organiser} from "./organiser.models";
import {UserPermissions} from "../constants/permissions.constants";


@Injectable({
  providedIn: 'root',
})
export class User {

  private _data: BehaviorSubject<UserType> = new BehaviorSubject<UserType>({} as UserType);

  get data() {
    return this._data.getValue();
  }

  get data$() {
    return this._data.asObservable();
  }

  set data(value: UserType) {
    this._data.next(value);
  }


  private _authenticated = new BehaviorSubject<boolean>(false);

  get authenticated() {
    return this._authenticated.getValue();
  }

  get authenticated$() {
    return this._authenticated.asObservable();
  }

  set authenticated(value: boolean) {
    this._authenticated.next(value);
  }


  permissions: UserPermissions[] = [];
  error: any;

  client: Client = new Client(this.apollo, this.gqlErrors);
  organiser: Organiser = new Organiser(this.apollo, this.gqlErrors);

  constructor(
    private apollo: Apollo,
    public gqlErrors: GraphQLErrorsService,
  ) {
    const initialData = localStorage.getItem('userData');
    ////////////////////////////////////////////////////////////////FIX THIS
    if (initialData) {
      this._data.next(JSON.parse(initialData));
      this.permissions = this.data.permissions || [];
    }
    this.data$.subscribe((data) => {
      localStorage.setItem('userData', JSON.stringify(data));
    });
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
      this.authenticated = !result.data.userLoginOrOut.success || this.authenticated;
      if (!this.authenticated) {
        this.data.email = "";
        this.permissions = [];
      }
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
      return this.authenticated;
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
      this.authenticated = !!result.data.userLoginOrOut.success;
      if (this.authenticated) {
        this.data.email = user.email;
        result.data.userLoginOrOut.isClient ? this.addPermission(UserPermissions.CLIENT) : null;
        result.data.userLoginOrOut.isOrganiser ? this.addPermission(UserPermissions.ORGANISER) : null;
      }
      this.gqlErrors.setErrors(result.data.userLoginOrOut.errors);
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
      this.authenticated = result.data.isAuthenticated;
      this.error = result.error;
      return this.authenticated;
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
      this.authenticated = !!result.data.createOrUpdateUser.success;
      this.gqlErrors.setErrors(result.data.createOrUpdateUser.errors);
      this.error = result.error;
      if (this.authenticated) {
        this.data.email = user.email;
      }
      return true;
    } catch
      (error) {
      this.error = error;
      return false;
    }
  }

  addPermission(permission: UserPermissions) {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      this.data.permissions = this.permissions;
    }
  }
}
