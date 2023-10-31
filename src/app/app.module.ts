import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {GraphQLModule} from './services/graphql/graphql.module';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
import {CsrfInterceptor, UserService} from "./services";
import {CookieService} from 'ngx-cookie-service';
import {UserModel} from "./models";
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
import {CreateUserComponent} from './components/create-user/create-user.component';
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {LoginUserComponent} from './components/login-user/login-user.component';
import {CreateClientComponent} from './components/create-client/create-client.component';
import {CreateOrganiserComponent} from './components/create-organiser/create-organiser.component';
import {DashboardClientComponent} from './components/dashboard-client/dashboard-client.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {DashboardOrganiserComponent} from './components/dashboard-organiser/dashboard-organiser.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {appRoutes} from "./app.routes";
import {LogoutUserComponent} from './components/logout-user/logout-user.component';
import {AppInitializerService} from "./services/initializer/app.initializer";
import {EventsListComponent} from './components/dashboard-organiser/events-list/events-list.component';
import {EventsFilterComponent} from './components/dashboard-organiser/events-filter/events-filter.component';
import {EventDetailComponent} from './components/dashboard-organiser/events-list/event-detail/event-detail.component';
import {
    AppEventDatetimeComponent
} from './components/dashboard-organiser/events-list/event-detail/event-datetime/app-event-datetime.component';
import {
    EventDescriptionComponent
} from './components/dashboard-organiser/events-list/event-detail/event-description/event-description.component';
import {
    EventAddressComponent
} from './components/dashboard-organiser/events-list/event-detail/event-address/event-address.component';
import {
    EventTitleComponent
} from './components/dashboard-organiser/events-list/event-detail/event-title/event-title.component';
import {
    EventCategoryComponent
} from './components/dashboard-organiser/events-list/event-detail/event-category/event-category.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import {GeoService} from "./services/geo-services/geo.service";


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
    MatProgressSpinnerModule,

];

const BROWSERMODULES = [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
        cookieName: 'csrftoken',
        headerName: 'X-CSRFToken',
    })
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
        LogoutUserComponent,
        EventsListComponent,
        EventsFilterComponent,
        EventDetailComponent,
        AppEventDatetimeComponent,
        EventDescriptionComponent,
        EventAddressComponent,
        EventTitleComponent,
        EventCategoryComponent,
    ],
    imports: [
        BROWSERMODULES,
        FORMSMODULES,
        MATERIALMODULES,
        FlexLayoutModule,
        CKEditorModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CsrfInterceptor,
            multi: true
        },
        UserService,
        {
            provide: APP_INITIALIZER,
            useFactory: (userService: UserService) => () => {
                userService;
                return true;
            },
            deps: [UserService],
            multi: true
        },
        AppInitializerService,
        {
            provide: APP_INITIALIZER,
            useFactory: (appInitializer: AppInitializerService) => () => appInitializer.init(),
            deps: [AppInitializerService],
            multi: true
        },
        CookieService,
        UserModel,
        GeoService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
