import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {ClientType, OrganiserType, UserType} from "../../types";
import {UserPermissions} from "../../constants";
import {LocalStorageConstants} from "../../constants/localstorage.constants";
import {EventNodeType} from "../../graphql/events/events.graphql";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {
    const initialData = localStorage.getItem(LocalStorageConstants.USER_DATA);
    if (initialData) {
      this._data.next(JSON.parse(initialData));
      this._permissions = this.data.permissions || [];
    }
    if (this.hasNoPermissions) {
      this.logout();
    }
    this.data$.subscribe((data) => {
      localStorage.setItem(LocalStorageConstants.USER_DATA, JSON.stringify(data));
    });
  }

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
    const newData = {...this.data, authenticated: value}; // create a copy of current data with updated authenticated value
    this.data = newData; // use the setter to update the data and trigger BehaviorSubject
    this._authenticated.next(value); // update the authenticated BehaviorSubject
  }


  private _permissions: UserPermissions[] = [];

  addPermission(permission: UserPermissions) {
    if (!this._permissions.includes(permission)) {
      const updatedPermissions = [...this._permissions, permission];
      this._permissions = updatedPermissions;
      this.data = {...this.data, permissions: updatedPermissions};
    }
  }

  removePermission(permission: UserPermissions) {
    if (this._permissions.includes(permission)) {
      const updatedPermissions = this._permissions.filter((p) => p !== permission);
      this._permissions = updatedPermissions;
      this.data = {...this.data, permissions: updatedPermissions};
    }
  }

  hasPermission(permission: UserPermissions) {
    return this._permissions.includes(permission);
  }

  get permissions(): UserPermissions[] {
    return this._permissions.slice();  // return a copy to ensure immutability
  }

  get hasNoPermissions() {
    return this._permissions.length === 0;
  }


  logout() {
    this.authenticated = false;
    this.data = {} as UserType;
    this._permissions = [];
  }

  updateUserData(user: UserType, createNewUser: boolean) {
    user.password = user.password2 = "";
    if (createNewUser) {
      user.authenticated = true;
      this.data = user;
    } else {
      this.data = {...this.data, ...user};
    }
  }

  updateClientData(client: ClientType) {
    this.data = {...this.data, client: client};
  }

  updateOrganiserData(organiser: OrganiserType | undefined) {
    this.data = {...this.data, organiser: organiser};
  }


 addOrganiserEvents(edges: Array<{ node: EventNodeType; cursor: string }> | undefined) {
  if (!this.data.organiser) {
    this.data.organiser = {address: {}};
  }
  if (!this.data.organiser.ownedEvents) {
    this.data.organiser.ownedEvents = {};
  }

  edges?.forEach((edge) => {
    // @ts-ignore
    this.data.organiser.ownedEvents[edge.node.id] = edge.node;
  });
  this.data = {...this.data};
}
}
