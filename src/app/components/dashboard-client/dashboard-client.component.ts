import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {ComponentState, PROJECT} from "../../constants";
import {EventNodeType} from "../../graphql/events/events.graphql";
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {ClientEventsDetailComponent} from "./client-events-detail/client-events-detail.component";
import {ComponentMode} from "../../constants/mode.components";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-dashboard-client',
    templateUrl: './dashboard-client.component.html',
    styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit, AfterViewInit {
    @ViewChild(MatSidenav) sidenav!: MatSidenav;

    @ViewChild(ClientEventsDetailComponent) selectedEventComponent!: ClientEventsDetailComponent;

    @Input() mapLocation: google.maps.LatLngLiteral = {lat: 49.3538, lng: 9.1439};

    state = ComponentState.LOADING;
    mode = ComponentMode.SEARCH
    eventVisible: boolean = false;

    public eventsList: EventNodeType[] = [];

    updateEventsList(eventsList: EventNodeType[]) {
        this.eventsList = eventsList;
    }


    constructor(
        private observer: BreakpointObserver,
        private snackBar: MatSnackBar,
    ) {
    }

    ngOnInit(): void {
        this.state = ComponentState.READY;
    }

    ngAfterViewInit() {
        if (this.mode === ComponentMode.LIST || !this.sidenav) return
        this.observer.observe(["(max-width: 720px)"]).subscribe((res) => {
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

    showEvent(event: EventNodeType) {
        this.eventVisible = true;
        this.selectedEventComponent.loadEvent(event)
    }

    closeEvent() {
        this.eventVisible = false;
    }


    toggle() {
        this.mode = this.mode === ComponentMode.SEARCH ? ComponentMode.LIST : ComponentMode.SEARCH;
    }

    protected readonly ComponentMode = ComponentMode;

    showSuccessfullyBookedMessage() {
        console.log(123)
        this.showMessage("You Successfully booked this event.")
    }

    showSuccessfullyExitedEvent() {
        console.log(321)
        this.showMessage("You Successfully canceled this booking")
    }

    showMessage(message: string) {
        this.snackBar.open(
            message,
            "Close",
            {
                duration: 2000,
            }
        )
    }
}
