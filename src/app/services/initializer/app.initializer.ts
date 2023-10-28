import {Injectable} from "@angular/core";
import {CsrfService} from "../csrf/csrf.service";
import {User} from "../../models";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: 'root'})
export class AppInitializerService {
  constructor(private httpService: CsrfService, public user: User) {
  }

  public initStatus = new BehaviorSubject<boolean | null>(null);

  init(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.httpService.getAndSetCsrfToken().then(async () => {
        this.user.authenticated = await this.user.isAuthenticated();
        this.initStatus.next(true);
        //resolve(true);
      }).catch((error) => {
        this.initStatus.next(false);
        //reject(error);
      }).finally(
        () => {
          // let the app load, the error will be handled by the app component
          resolve(true);
        }
      );
    });
  }
}
