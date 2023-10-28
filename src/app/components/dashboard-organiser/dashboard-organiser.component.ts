import {Component, OnInit, ViewChild} from '@angular/core';
import {OrganiserModel} from "../../models/organiser.models";
import {ComponentState, LinksConstants} from "../../constants";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard-organiser',
  templateUrl: './dashboard-organiser.component.html',
  styleUrls: ['./dashboard-organiser.component.css']
})
export class DashboardOrganiserComponent implements OnInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  state = ComponentState.LOADING;

  constructor(
    private organiserModel: OrganiserModel,
    private observer: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.state = ComponentState.READY;
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


  protected readonly ComponentState = ComponentState;
  protected readonly LinksConstants = LinksConstants;
}
