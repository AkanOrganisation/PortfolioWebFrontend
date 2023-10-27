import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {CsrfService} from "../../services";
import {User} from "../../models";
import {BreakpointObserver} from "@angular/cdk/layout";
import {LinksConstants} from "../../constants/links-constants";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  loading = true;
  ready = false;
  error: any;

  constructor(
    public user: User,
    private observer: BreakpointObserver,
  ) {
  }

  async ngOnInit() {
    this.ready = this.user.authenticated;
    if (!this.ready) {
      console.log("Not authenticated");
    }
    this.loading = false;
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