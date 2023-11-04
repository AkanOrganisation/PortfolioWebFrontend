import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentState, PROJECT} from "../../constants";
import {EventNodeType} from "../../graphql/events/events.graphql";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard-client',
  templateUrl: './dashboard-client.component.html',
  styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  @Input() mapLocation: google.maps.LatLngLiteral = {lat: 49.3538, lng: 9.1439};

  state = ComponentState.LOADING;

  public eventsList: EventNodeType[] = [];

  updateEventsList(eventsList: EventNodeType[]) {
    this.eventsList = eventsList;
  }


  constructor(
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
  protected readonly PROJECT = PROJECT;

  updateMapLocation($event: google.maps.LatLngLiteral) {
    this.mapLocation = $event;

  }
}
