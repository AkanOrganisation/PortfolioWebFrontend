import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';


@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(AppComponent.graphqlUrl)) {
      const clonedRequest = req.clone({
        withCredentials: true,
        headers: req.headers.set('X-CSRFToken', document.cookie.split('csrftoken=')[1].split(';')[0])
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}

