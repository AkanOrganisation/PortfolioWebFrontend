import {Component, OnInit, ViewChild} from '@angular/core';
import {CsrfService} from './services/csrf/csrf.service';
import {User} from "./models";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {LinksConstants} from "./constants/links-constants";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  authenticated: boolean | undefined;

  loading = true;
  ready = false;
  error: any;

  constructor(
    private httpService: CsrfService,
    public user: User,
    private observer: BreakpointObserver,
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

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

  protected readonly Constants = LinksConstants;
}

