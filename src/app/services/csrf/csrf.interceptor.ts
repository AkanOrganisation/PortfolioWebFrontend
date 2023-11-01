import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {API_ENDPOINTS} from "../../constants";
import {CookieService} from "ngx-cookie-service";

@Injectable()
export class CsrfInterceptor implements HttpInterceptor {
    constructor(
        private cookieService: CookieService
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith(API_ENDPOINTS.API_GRAPHQL_ENDPOINT)) {
            const token = this.cookieService.get(API_ENDPOINTS.CSRF_COOKIE_NAME);
            const clonedRequest = req.clone({
                withCredentials: true,
                headers: req.headers.set(API_ENDPOINTS.CSRF_HEADER_NAME, token),
            });
            return next.handle(clonedRequest);
        }
        return next.handle(req);
    }
}

