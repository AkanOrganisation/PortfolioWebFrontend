import {Routes} from "@angular/router";
import {CreateUserComponent} from "./components/create-user/create-user.component";
import {LoginUserComponent} from "./components/login-user/login-user.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthGuard} from "./services/guards/auth.guard";
import {UserPermissions} from "./constants/permissions.constants";
import {LogoutUserComponent} from "./components/logout-user/logout-user.component";
import {RoleGuard} from "./services/guards/role.guard";


export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginUserComponent,
  },
  {
    path: 'logout',
    component: LogoutUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'register',
    component: CreateUserComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { permissions: [UserPermissions.CLIENT, UserPermissions.ORGANISER] },
  },
  // {
  //   path: 'events',
  //   component: EventsComponent,
  //   canActivate: [AuthGuard, RoleGuard],
  //   data: { permissions: [userPermissions.CLIENT, userPermissions.ORGANISER] },
  // },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];
