import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {NgModule} from '@angular/core';
import {ApolloClientOptions, InMemoryCache, ApolloLink} from '@apollo/client/core';
import {HttpHeaders} from '@angular/common/http';
import {API_ENDPOINTS} from "../../constants";
import {CookieService} from 'ngx-cookie-service'; // Make sure you have installed ngx-cookie-service

const uri = API_ENDPOINTS.API_GRAPHQL_ENDPOINT;

export function createApollo(httpLink: HttpLink, cookieService: CookieService): ApolloClientOptions<any> {
  // Use the provided cookieService to get the CSRF token
  function getCsrfToken() {
    return cookieService.get(API_ENDPOINTS.CSRF_COOKIE_NAME);
  }

  const http = httpLink.create({
    uri,
    withCredentials: true
  });

  const authLink = new ApolloLink((operation, forward) => {
    const csrfToken = getCsrfToken();

    operation.setContext(({headers = new HttpHeaders()}) => ({
      headers: headers.append(API_ENDPOINTS.CSRF_HEADER_NAME, csrfToken)
    }));

    return forward(operation);
  });

  return {
    cache: new InMemoryCache(),
    link: authLink.concat(http),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, CookieService],
    },
  ],
})
export class GraphQLModule {
}
