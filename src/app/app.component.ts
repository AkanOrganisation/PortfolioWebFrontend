import {Component, OnInit, ViewChild} from '@angular/core';
import {CsrfService} from './services/csrf/csrf.service';
import {User} from "./models";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {LinksConstants} from "./constants/links-constants";
import {ComponentState} from "./constants";
import {DEBUG} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import {AppInitializerService} from "./services/initializer/app.initializer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  state = ComponentState.LOADING;
  error: any;

  constructor(
    private httpService: CsrfService,
    public user: User,
    private observer: BreakpointObserver,
    private appInitializer: AppInitializerService,
  ) {
  }

  ngOnInit() {
    this.appInitializer.initStatus.subscribe((status) => {
      if (status) {
        this.state = ComponentState.READY;
      } else {
        this.state = ComponentState.ERROR;
      }
    });
    // await this.httpService.getAndSetCsrfToken().then(
    //   async () => {
    //     this.user.authenticated = await this.user.isAuthenticated();
    //     this.state = ComponentState.READY
    //   }).catch((error) => {
    //   this.error = error;
    //   this.state = ComponentState.ERROR
    // })
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
  protected readonly ComponentState = ComponentState;
}

