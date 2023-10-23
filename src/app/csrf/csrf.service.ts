import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppComponent } from '../app.component';

@Injectable({
  providedIn: 'root',
})
export class CsrfService {
  constructor(private http: HttpClient) {}

  setCsrfToken(token: string) {
    document.cookie = `csrftoken=${token}; path=/`;
  }

  getCsrfToken(url: string) {
   return firstValueFrom(this.http.get(url));
}
}
