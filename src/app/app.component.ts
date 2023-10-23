import { Component, OnInit } from '@angular/core';
import { CsrfService } from './csrf/csrf.service';
import { Constants } from './constants';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = Constants.TitleOfSite;
  loading = true;
  ready = false;
  error: any;

  constructor(
    private httpService: CsrfService
  ) {}

  async ngOnInit() {
    try {
      this.httpService.setCsrfToken();
      this.loading = false;
      this.ready = true;
    }
    catch (error) {
      this.error = error;
      this.loading = false;
      this.ready = false;
    }
  }

}

