// role.guard.ts
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {User} from 'src/app/models';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UserPermissions} from "../../constants/permissions.constants";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard {
  constructor(private user: User, private router: Router) {
  }

  canActivate: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) => {
    const requiredPermissions = route.data['permissions'] as UserPermissions[] || [];

    if (requiredPermissions.length === 0) return true;  // no permissions required

    if (this.user.permissions.length === 1 && this.user.permissions.includes(UserPermissions.USER)) {
      this.router.navigate(['/register']); // didn't finish registration
      return false;
    }

    if (this.user.permissions.includes(UserPermissions.SUPERUSER)) {
      return true;  // superuser can access everything
    }

    if (requiredPermissions.some((permission) => this.user.permissions.includes(permission))) return true;

    this.router.navigate(['/']);
    return false;
  };
}
