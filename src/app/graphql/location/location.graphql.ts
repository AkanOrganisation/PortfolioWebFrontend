import {LookupFilterType} from "../lookups.graphql";


export type LocationFilterType = {
  locationLat?: LookupFilterType<number>;
  locationLng?: LookupFilterType<number>;
  radius?: LookupFilterType<number>; // in meters
}
