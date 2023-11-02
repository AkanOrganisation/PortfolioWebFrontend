import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState, getEmptyAddress} from "../../../../../constants";
import {ComponentMode} from "../../../../../constants/mode.components";
import {GeoService} from "../../../../../services/geo-services/geo.service";
import {AddressType, LocationType} from "../../../../../types";
import {LocationNodeType} from "../../../../../graphql/location/location.graphql";
import {AddressNodeType} from "../../../../../graphql/location/address.graphql";

@Component({
    selector: 'app-event-address',
    templateUrl: './event-address.component.html',
    styleUrls: ['./event-address.component.css']
})
export class EventAddressComponent {

    @Input() eventAddress?: AddressNodeType;
    eventAddressInput!: AddressNodeType;
    locationInput!: LocationNodeType;
    @Output() eventAddressChange = new EventEmitter<AddressNodeType>();
    @Output() eventLocationChange = new EventEmitter<LocationNodeType>();

    state = ComponentState.LOADING;
    mode = ComponentMode.VIEW;

    constructor(
        private geoServices: GeoService,
    ) {
    }

    ngOnInit() {
        if (!this.eventAddress) {
            this.eventAddress = {
                streetName: '',
                streetNumber: '',
                city: '',
                country: '',
                postalCode: '',
                additional: '',
            }
            this.mode = ComponentMode.EDIT;
        }
        this.eventAddressInput = {...this.eventAddress};

        this.state = ComponentState.READY;


    }

    toggle() {
        this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.EDIT : ComponentMode.VIEW;
    }

    async save() {
        this.state = ComponentState.PROCESSING;
        if (!this.eventAddressInput) return;
        await this.geoServices.getGeoLocation(this.eventAddressInput).then((location) => {
                if (location && location.lat && location.lng) {
                    this.locationInput = {location: [location.lat, location.lng]}
                    this.eventLocationChange.emit(this.locationInput);
                    console.log(this.locationInput);
                }
            }
        ).catch((error) => {
            console.error(error);
        });
        console.log(123)
        this.eventAddressChange.emit(this.eventAddressInput);
        this.mode = ComponentMode.VIEW;
        this.state = ComponentState.READY;
    }

    cancel() {
        this.eventAddressInput = this.eventAddress || getEmptyAddress();
        this.mode = ComponentMode.VIEW;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;

    addressToString(eventAddress: AddressType | undefined): string {
        if (!eventAddress) {
            return 'Not provided';
        }

        let addressParts = [
            eventAddress.streetName,
            eventAddress.streetNumber,
            eventAddress.additional,
            eventAddress.postalCode,
            eventAddress.city,
            eventAddress.country
        ];

        // Filter out undefined or empty parts and join them with ', '
        return addressParts.filter(part => !!part).join(', ');
    }

}
