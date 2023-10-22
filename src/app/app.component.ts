import { Component, OnInit } from '@angular/core';
import { HttpService } from './http.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static backendUrl = 'http://127.0.0.1:8000/';
  static csrfUrl = AppComponent.backendUrl + 'api/get_csrf/';
  static graphqlUrl = AppComponent.backendUrl + 'graphql/';
  title = 'PortfolioWebFrontend';
  loading = true;
  error: any;
  ready = false;
  constructor(
    private httpService: HttpService
  ) {}

  async ngOnInit() {
    const data: any = await this.httpService.getCsrfToken(AppComponent.csrfUrl);
    this.httpService.setCsrfToken(data.csrfToken);
    this.loading = false;
    this.ready = true;
  }

}
