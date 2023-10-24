import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserComponent } from './users/user/user.component';
import {CsrfInterceptor} from "./services/csrf/csrf.interceptor";
import { CookieService } from 'ngx-cookie-service';
import {User} from "./models";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CsrfInterceptor, multi: true },
    CookieService,
    User,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
