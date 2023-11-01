import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {NgModule} from '@angular/core';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {API_ENDPOINTS} from "../../constants";

const uri = API_ENDPOINTS.API_GRAPHQL_ENDPOINT;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        cache: new InMemoryCache(),
        link: httpLink.create({
            uri: uri,
        }),
    };
}

@NgModule({
    exports: [ApolloModule],
    providers: [
        {
            provide: APOLLO_OPTIONS,
            useFactory: createApollo,
            deps: [HttpLink],
        },
    ],
})
export class GraphQLModule {
}
