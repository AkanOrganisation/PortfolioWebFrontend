import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsLoaderService {
  private scriptLoaded!: Observable<boolean>;
  private isLoaded: boolean = false;

  constructor(private httpClient: HttpClient) {}

  loadScript(apiKey: string): Observable<boolean> {
    // If the script is already loaded, return an Observable of true
    if (this.isLoaded) {
      return of(true);
    }

    // If the script is being loaded, return the existing Observable
    if (this.scriptLoaded) {
      return this.scriptLoaded;
    }

    const scriptUrl = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;

    this.scriptLoaded = this.httpClient.jsonp(scriptUrl, 'callback')
      .pipe(
        map(() => {
          this.isLoaded = true; // Set the flag to true when loaded
          return true;
        }),
        catchError(() => {
          console.error('Could not load Google Maps script');
          return of(false);
        }),
        share() // Share the Observable among multiple subscribers
      );

    return this.scriptLoaded;
  }
}
