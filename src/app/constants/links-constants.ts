import {Injectable} from '@angular/core';

@Injectable()
export class LinksConstants {
  public static readonly API_ENDPOINT: string = 'http://127.0.0.1:8000/';
  public static readonly API_GRAPHQL_ENDPOINT: string = LinksConstants.API_ENDPOINT + 'graphql/';
  public static readonly API_CSRF_ENDPOINT: string = LinksConstants.API_ENDPOINT + 'api/get_csrf/';
  public static readonly CSRF_COOKIE_NAME: string = 'csrftoken';
  public static TitleOfProject: string = "PortfolioWebFrontend";
}
