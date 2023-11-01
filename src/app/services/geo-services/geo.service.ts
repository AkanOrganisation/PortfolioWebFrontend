import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AddressType, LocationType} from "../../types";
import {API_MAPS} from "../../constants/api-maps.constants";


@Injectable({
    providedIn: 'root'
})
export class GeoService {
    private API_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
    private secretKey = API_MAPS.SECRET_KEY;

    constructor(
        private http: HttpClient,
    ) {
    }

    public async getGeoLocation(address: AddressType): Promise<LocationType> {

        return new Promise<LocationType>((resolve, reject) => {
            this.http.get(this.addressToUrl(address)).subscribe({
                next: (result: any) => {
                    if (result.status === 'OK') {
                        resolve(result.results[0].geometry.location);
                    } else {
                        reject('Failed to get location');
                    }
                },
                error: (error) => {
                    console.error('Error getting location', error);
                    reject('Failed to connect to server, please try again later.');
                }
            });

        });
    }

    private addressToUrl(address: AddressType): string {
        let url = this.API_ENDPOINT;
        if (address.country) {
            url += address.country + ',';
        }
        if (address.postalCode) {
            url += address.postalCode + ',';
        }
        if (address.city) {
            url += address.city + ',';
        }
        if (address.streetName) {
            url += address.streetName + ',';
        }
        if (address.streetNumber) {
            url += address.streetNumber + ',';
        }
        if (address.additional) {
            url += address.additional + ',';
        }
        url += '&key=' + this.secretKey;
        return url;
    }


}
