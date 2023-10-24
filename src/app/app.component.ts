import {Component, Input, OnInit} from '@angular/core';
import {CsrfService} from './services/csrf/csrf.service';
import {Constants} from './constants';
import {User} from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  authenticated: boolean | undefined;
  title = Constants.TitleOfSite;
  loading = true;
  ready = false;
  error: any;

  constructor(
    private httpService: CsrfService,
    public user: User,
  ) {
  }

  async ngOnInit() {
    this.httpService.getAndSetCsrfToken().then(
      async () => {
        this.authenticated = await this.user.isAuthenticated();
        this.ready = true;
      }).catch((error) => {
      this.error = error;
      this.ready = false;
    }).finally(() => {
      this.loading = false;
    });
  }
}

