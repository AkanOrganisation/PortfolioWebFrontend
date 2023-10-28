// role.guard.ts
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserPermissions} from "../../constants";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private user: UserService, private router: Router) {
  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const requiredPermissions = route.data['permissions'] as UserPermissions[] || [];

    if (requiredPermissions.length === 0) return true;  // no permissions required

    if (this.user.permissions.length === 0) {
      this.router.navigate(['/register']); // didn't finish registration
      return false;
    }

    if (this.user.hasPermission(UserPermissions.SUPERUSER)) {
      return true;  // superuser can access everything
    }

    if (requiredPermissions.some((permission) => this.user.hasPermission(permission))) return true;

    this.router.navigate(['/']);
    return false;
  };
}
