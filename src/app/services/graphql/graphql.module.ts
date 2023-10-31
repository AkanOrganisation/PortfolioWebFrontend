import {APOLLO_OPTIONS, ApolloModule} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {NgModule} from '@angular/core';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import {LinksConstants} from "../../constants/links-constants";

const uri = LinksConstants.API_GRAPHQL_ENDPOINT;

export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
    return {
        cache: new InMemoryCache(),
        link: httpLink.create({
            uri: uri,
            withCredentials: true,
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
