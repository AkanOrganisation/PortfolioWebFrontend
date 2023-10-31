import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { LinksConstants } from "../../constants/links-constants";
import { HttpHeaders } from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';  // <-- import CookieService

const uri = LinksConstants.API_GRAPHQL_ENDPOINT; // <-- add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, cookieService: CookieService): ApolloClientOptions<any> {  // <-- inject CookieService
    return {
        cache: new InMemoryCache(),
        link: httpLink.create({
            uri: uri,
            withCredentials: true,
            headers: new HttpHeaders().set(LinksConstants.CSRF_HEADER_NAME,
                cookieService.get(LinksConstants.CSRF_COOKIE_NAME) || ''),  // <-- use CookieService
        }),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink, CookieService],  // <-- add CookieService to dependencies
        },
    ],
})
export class GraphQLModule { }
