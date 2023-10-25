import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {UserComponent} from './users/user/user.component';
import {CsrfInterceptor} from "./services/csrf/csrf.interceptor";
import {CookieService} from 'ngx-cookie-service';
import {User} from "./models";
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {RouterModule, Routes} from "@angular/router";
import { CreateUserComponent } from './components/create-user/create-user.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CreateClientComponent } from './components/create-client/create-client.component';

let MaterialModules = [
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatCardModule,
    MatSelectModule,
    MatSidenavModule,
    MatDividerModule,
    MatInputModule,
    MatFormFieldModule,
  ];

const appRoutes: Routes = [
  { path: 'register/', component: CreateUserComponent },
];




@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CreateUserComponent,
    LoginUserComponent,
    CreateClientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    MaterialModules,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    CookieService,
    User,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
