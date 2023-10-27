import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './services/graphql/graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CsrfInterceptor} from "./services";
import {CookieService} from 'ngx-cookie-service';
import {User} from "./models";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
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
import {CreateUserComponent} from './components/create-user/create-user.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LoginUserComponent} from './components/login-user/login-user.component';
import {CreateClientComponent} from './components/create-client/create-client.component';
import {CreateOrganiserComponent} from './components/create-organiser/create-organiser.component';
import {DashboardClientComponent} from './components/dashboard-client/dashboard-client.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DashboardOrganiserComponent} from './components/dashboard-organiser/dashboard-organiser.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {appRoutes} from "./app.routes";




const MATERIALMODULES = [
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

const BROWSERMODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  RouterModule.forRoot(appRoutes),
  GraphQLModule,
  HttpClientModule,
];

const FORMSMODULES = [
  FormsModule,
];


@NgModule({
  declarations: [
    AppComponent,
    CreateUserComponent,
    LoginUserComponent,
    CreateClientComponent,
    CreateOrganiserComponent,
    DashboardClientComponent,
    DashboardOrganiserComponent,
    DashboardComponent,
  ],
  imports: [
    BROWSERMODULES,
    FORMSMODULES,
    MATERIALMODULES,
    FlexLayoutModule,

    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true},
    CookieService,
    User,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
