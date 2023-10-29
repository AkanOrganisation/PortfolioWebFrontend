import {ConnectionFilterType} from "../graphql/filters.graphql";


const DEFAULT_PAGINATION_FILTER: ConnectionFilterType = {
  first: 100,
  last: undefined,
  after: undefined,
  before: undefined,
}


export function getDefaultPaginationFilter(): ConnectionFilterType {
  return JSON.parse(JSON.stringify(DEFAULT_PAGINATION_FILTER));
}
