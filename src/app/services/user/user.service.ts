import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {UserType} from "../../types";
import {UserPermissions} from "../../constants/permissions.constants";


@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor() {
    const initialData = localStorage.getItem('userData');
    if (initialData) {
      this._data.next(JSON.parse(initialData));
      this.permissions = this.data.permissions || this.permissions;
    }
    this.data$.subscribe((data) => {
      localStorage.setItem('userData', JSON.stringify(data));
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
    this._authenticated.next(value);
  }


  permissions: UserPermissions[] = [];

  addPermission(permission: UserPermissions) {
    if (!this.permissions.includes(permission)) {
      this.permissions.push(permission);
      this.data.permissions = this.permissions;
    }
  }


}
