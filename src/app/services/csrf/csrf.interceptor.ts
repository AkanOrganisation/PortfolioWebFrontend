import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constants} from "../../constants";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(Constants.API_GRAPHQL_ENDPOINT)) {
      const token = this.cookieService.get(Constants.CSRF_COOKIE_NAME);
      const clonedRequest = req.clone({
        withCredentials: true,
        headers: req.headers.set('X-CSRFToken', token)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}

