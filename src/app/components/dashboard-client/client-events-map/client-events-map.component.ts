import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {EventNodeType} from "../../../graphql/events/events.graphql";
import {API_MAPS} from "../../../constants/api-maps.constants";
import {ComponentState} from "../../../constants";
import {LocationNodeType} from "../../../graphql/location/location.graphql";


import {GoogleMapsLoaderService} from "../../../services/geo-services/google-maps-service";
import {GoogleMap} from "@angular/google-maps";


@Component({
  selector: 'app-client-events-map',
  templateUrl: './client-events-map.component.html',
  styleUrls: ['./client-events-map.component.css']
})
export class ClientEventsMapComponent implements OnInit, OnChanges {
  @ViewChild(GoogleMap) map!: GoogleMap;
  @Input() eventsList: EventNodeType[] = [];
  markers: google.maps.Marker[] = [];
  zoom = 12;
  @Input() mapLocation: google.maps.LatLngLiteral = {lat: 49.3538, lng: 9.1439};

  state = ComponentState.LOADING;

  @Output() selectedEvent = new EventEmitter<EventNodeType>();

  constructor(
    private mapsLoaderService: GoogleMapsLoaderService
  ) {
  }

  ngOnInit() {
    this.mapsLoaderService.loadScript(API_MAPS.SECRET_KEY)
      .subscribe(isLoaded => {
        if (isLoaded) {
          this.state = ComponentState.READY;
          // Google Maps script is loaded and ready to use
        } else {
          this.state = ComponentState.ERROR;
          // Handle the case where the script didn't load
        }
      });
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("ngOnChanges")
    if (changes["eventsList"] && this.state === ComponentState.READY) {
      // Check if the change is for eventsList
      const change = changes["eventsList"];
      if (change.currentValue !== change.previousValue) {
        // Handle the updated eventsList, for example:
        this.updateMarkers(change.currentValue);
      }
    }
  }

  updateMarkers(events: EventNodeType[]) {
    // Clear existing markers from the map
    this.removeMarkers();

    // Add new markers for the updated events list
    events.forEach((event) => this.addMarker(event));
  }

  addMarker(event: EventNodeType) {
    if (this.state === ComponentState.READY && this.map.googleMap) {
      const marker = new google.maps.Marker({
        map: this.map.googleMap,
        position: this.locationTupleToLatLngLiteral(event.location),
        title: event.title || 'Default Title',
        label: event.category || 'Default Category',
      });
      marker.addListener('click', () => this.selectEvent(event));
      this.markers.push(marker);
      console.log("Added marker", marker)
    }
  }

  removeMarkers() {
    this.markers.forEach(marker => marker.setMap(null));
    this.markers = [];
  }


  protected readonly ComponentState = ComponentState;


  locationTupleToLatLngLiteral(location: LocationNodeType | undefined): google.maps.LatLngLiteral {
    if (!location?.location) return this.mapLocation;
    return {lat: location.location[1], lng: location.location[0]};
  }

  selectEvent(event: EventNodeType) {
    this.selectedEvent.emit(event);
  }

}
