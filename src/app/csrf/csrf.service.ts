import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, pipe, throwError, catchError } from 'rxjs';
import { AppComponent } from '../app.component';
import { Constants } from '../constants';
import { CookieService } from 'ngx-cookie-service';
interface CsrfResponse {
  csrfToken: string;
}



@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    ) {}

  private getCsrfToken(url: string) {
    return this.http.get<CsrfResponse>(url).pipe(
      map((data) => {
        return data.csrfToken;
      }),
      catchError((error) => {
        console.log('Error fetching CSRF token',error);
        return throwError(error);
      })
    );
  }

  setCsrfToken(): void {
  this.getCsrfToken(Constants.API_CSRF_ENDPOINT).subscribe(
    {
      next: (data) => {
        this.cookieService.set(Constants.CSRF_COOKIE_NAME, data);
      },
      error: (error) => {
        console.error('Error setting CSRF token', error);
        throwError(error);
      }
    }
  )
}


}
