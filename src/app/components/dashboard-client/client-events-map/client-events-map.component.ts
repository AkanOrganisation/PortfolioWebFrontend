import {Component, Input} from '@angular/core';
import {EventNodeType} from "../../../graphql/events/events.graphql";
import {API_MAPS} from "../../../constants/api-maps.constants";
import {ComponentState} from "../../../constants";
import {LocationNodeType} from "../../../graphql/location/location.graphql";

@Component({
  selector: 'app-client-events-map',
  templateUrl: './client-events-map.component.html',
  styleUrls: ['./client-events-map.component.css']
})
export class ClientEventsMapComponent {
  @Input() eventsList: EventNodeType[] = [];
  zoom = 12;
  @Input() mapLocation: google.maps.LatLngLiteral = {lat: 49.3538, lng: 9.1439};

  state = ComponentState.LOADING;

  ngOnInit() {


    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_MAPS.SECRET_KEY}&callback=onGoogleMapsScriptLoad`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    (window as any).onGoogleMapsScriptLoad = this.onGoogleMapsScriptLoad.bind(this);

  }

  public onGoogleMapsScriptLoad() {
    this.state = this.ComponentState.READY;
  }


  protected readonly ComponentState = ComponentState;


  locationTupleToLatLngLiteral(location: LocationNodeType | undefined): google.maps.LatLngLiteral {
    if (!location?.location) return this.mapLocation;
    return {lat: location.location[0], lng: location.location[1]};
  }

}
