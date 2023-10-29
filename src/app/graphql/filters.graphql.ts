import {LookupFilterType} from "./lookups.graphql";
import {AddressFilterType} from "./location/address.graphql";

// Basic Pagination and Filtering Types
export type ConnectionFilterType = {
  [key: string]: any;
  after?: string;
  before?: string;
  first?: number;
  last?: number;
  offset?: number;
  filter?: any;
}

// Basic Pagination Result Types
export type PagedQueryResultType<T> = {
  edges: Array<{
    node: T;
    cursor: string;
  }>;
  pageInfo: {
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
  };
}
