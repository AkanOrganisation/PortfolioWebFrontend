// role.guard.ts
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {User} from 'src/app/models';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private user: User, private router: Router) {
  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    if (!this.user.authenticated) {
      this.router.navigate(['/login'])
      return false
    }
    return true
  };
}
