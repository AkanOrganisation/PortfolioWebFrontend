import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LinksConstants} from "../../constants/links-constants";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(LinksConstants.API_GRAPHQL_ENDPOINT)) {
      const token = this.cookieService.get(LinksConstants.CSRF_COOKIE_NAME);
      const clonedRequest = req.clone({
        withCredentials: true,
        headers: req.headers.set(LinksConstants.CSRF_HEADER_NAME, token)
      });
      console.log(clonedRequest);
      return next.handle(clonedRequest);
    }
    return next.handle(req);
  }
}

