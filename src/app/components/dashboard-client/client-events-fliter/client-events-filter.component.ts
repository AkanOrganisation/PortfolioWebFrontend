import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {
  EventNodeType,
  EventsDateTimeFilterConnectionType,
  EventsFilterConnectionType
} from "../../../graphql/events/events.graphql";
import {getDefaultDateTimesFilter, getDefaultEventsFilter} from "../../../constants/events-filter.constants";
import {NgForm} from "@angular/forms";
import {ComponentState} from "../../../constants";
import {ClientModel} from "../../../models";
import {EventModel} from "../../../models/event.models";
import {GeoService} from "../../../services/geo-services/geo.service";
import {AddressType} from "../../../types";

@Component({
  selector: 'app-client-events-filter',
  templateUrl: './client-events-filter.component.html',
  styleUrls: ['./client-events-filter.component.css']
})
export class ClientEventsFilterComponent implements OnInit, OnDestroy {
  private subscription: Subscription | undefined;


  @Output() eventsList = new EventEmitter<EventNodeType[]>();
  @Output() mapLocation = new EventEmitter<google.maps.LatLngLiteral>();

  state = ComponentState.LOADING;
  eventsFilter: EventsFilterConnectionType = getDefaultEventsFilter();
  eventDateTimesFilter: EventsDateTimeFilterConnectionType = getDefaultDateTimesFilter();

  datesFilter = {
    from: new Date(),
    to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
  }

  searchByLocation = false;
  _addressSearch: any;

  get addressSearch() {
    return this._addressSearch;
  }

  set addressSearch(value: any) {
    this._addressSearch = value;
    if (isNumeric(value)) {
      this.eventsFilter.filter.address.postalCode.exact = value;
      this.eventsFilter.filter.address.city.exact = undefined;
    } else {
      this.eventsFilter.filter.address.city.exact = value;
      this.eventsFilter.filter.address.postalCode.exact = undefined;
    }
  }

  protected eventsEndCursor = undefined;
  protected hasNextPage = false;

  constructor(
    protected clientModel: ClientModel,
    protected eventModel: EventModel,
    protected geoService: GeoService,
  ) {
    this.initializeEventsFilter();
  }

  ngOnInit(): void {
    this.state = ComponentState.READY;
  }

  private initializeEventsFilter() {

  }

  private handleApiResponse(result: any) {

    this.eventsEndCursor = result.data.allEventsClientPublic?.pageInfo.endCursor;
    this.hasNextPage = result.data.allEventsClientPublic?.pageInfo.hasNextPage;

    this.eventsList.emit(
      result.data.allEventsClientPublic?.edges
        .filter((edge: any) => edge.node.dates?.edges)  // Filter out events with no dates
        .map((edge: any) => edge.node)  // Map to the node which contains the event information
    );


    this.state = ComponentState.READY;

  }

  private fetchData(cursorKey?: string, cursorValue?: string) {
    this.state = ComponentState.PROCESSING;
    if (cursorKey && cursorValue) {
      this.eventsFilter[cursorKey] = cursorValue;
    }
    this.eventsFilter.filter.dates.datetime.range = [
      new Date(Date.UTC(this.datesFilter.from.getFullYear(), this.datesFilter.from.getMonth(), this.datesFilter.from.getDate())),
      new Date(Date.UTC(this.datesFilter.to.getFullYear(), this.datesFilter.to.getMonth(), this.datesFilter.to.getDate() + 1))
    ];
    // the above filter delivers all event date-times whose one of the dates is in the range, api design bug
    this.eventDateTimesFilter.filter.datetime.range = this.eventsFilter.filter.dates.datetime.range;
    this.subscription = this.eventModel.getEventsList(
      this.eventsFilter,
      this.eventDateTimesFilter
    ).subscribe({
      next: this.handleApiResponse.bind(this),
      error: (error) => {
        console.log(error);
        this.state = ComponentState.ERROR;
      },
      complete: () => {
        console.log('complete');
        this.state = ComponentState.READY;
      }
    });

    if (cursorKey) {
      this.eventsFilter[cursorKey] = undefined;
    }
  }

  applyFilter(filterEventsForm: NgForm) {
    this.fetchData();
  }

  nextPage() {
    this.fetchData('after', this.eventsEndCursor);
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  protected readonly ComponentState = ComponentState;

  async searchMyLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log('Geolocation retrieved successfully:', position);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Use the latitude and longitude for your purpose, like:
          const postalCode = await this.geoService.getPostalCodeFromLocation(lat, lng);
          if (postalCode) {
            this.searchByLocation = true;
            this.clearAddressSearch();
            this._addressSearch = postalCode;
            this.eventsFilter.filter.location.lat.exact = lat;
            this.eventsFilter.filter.location.lng.exact = lng;

            this.mapLocation.emit({lat, lng});
          }
        },
        (error) => {
          console.error('Error retrieving location:', error);
          // Handle location errors here
        },
        {
          timeout: 10000,  // 10 seconds
          maximumAge: 3600000,  // 1 hour
          enableHighAccuracy: true
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  searchByAddress() {
    this.searchByLocation = false;
    this.clearLocationSearch();
    this.addressSearch = undefined;

  }

  clearAddressSearch() {
    this.eventsFilter.filter.address.postalCode.exact = undefined;
    this.eventsFilter.filter.address.city.exact = undefined;
  }

  clearLocationSearch() {
    this.eventsFilter.filter.location.lat.exact = undefined;
    this.eventsFilter.filter.location.lng.exact = undefined;
  }

  async searchAddress() {
    const address: AddressType = {
      postalCode: this.eventsFilter.filter.address.postalCode.exact,
      city: this.eventsFilter.filter.address.city.exact,
    }
    const geoLocation = await this.geoService.getGeoLocation(address);
    if (geoLocation) {
      this.mapLocation.emit({lat: geoLocation.lat as number, lng: geoLocation.lng as number});
    }
  }
}


function isNumeric(value: string): boolean {
  return /^\d+$/.test(value);
}
