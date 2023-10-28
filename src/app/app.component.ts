import {Component, OnInit, ViewChild} from '@angular/core';
import {UserModel} from "./models";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatSidenav} from "@angular/material/sidenav";
import {LinksConstants} from "./constants/links-constants";
import {ComponentState} from "./constants";
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
    public user: UserModel,
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

