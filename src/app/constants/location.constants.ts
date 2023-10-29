import {LocationFilterType} from "../graphql/location/location.graphql";

// DHBW, Lohrtalweg 10, 74821 Mosbach
const MOSBACH_LOCATION_FILTER: LocationFilterType = {
  locationLat: {
    exact: 49.35431131686691,
  },
  locationLng: {
    exact: 9.150493075599343,
  },
  radius: {
    exact: 200000,
  }
}


const DEFAULT_LOCATION_FILTER: LocationFilterType = {
  locationLat: {
    exact: undefined,
  },
  locationLng: {
    exact: undefined,
  },
  radius: {
    exact: 200000,
  }
}


export function getDefaultLocationFilter(): LocationFilterType {
  return JSON.parse(JSON.stringify(DEFAULT_LOCATION_FILTER));
}

export function getMosbachLocationFilter(): LocationFilterType {
  return JSON.parse(JSON.stringify(MOSBACH_LOCATION_FILTER));
}
