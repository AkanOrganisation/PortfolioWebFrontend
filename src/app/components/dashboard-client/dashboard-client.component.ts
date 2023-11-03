import {Component, OnInit} from '@angular/core';
import {ComponentState, PROJECT} from "../../constants";
import {EventNodeType} from "../../graphql/events/events.graphql";

@Component({
    selector: 'app-dashboard-client',
    templateUrl: './dashboard-client.component.html',
    styleUrls: ['./dashboard-client.component.css']
})
export class DashboardClientComponent implements OnInit {
    state = ComponentState.LOADING;

    public eventsList: EventNodeType[] = [];

    updateEventsList(eventsList: EventNodeType[]) {
        this.eventsList = eventsList;
    }


    constructor(
    ) {
    }

    ngOnInit(): void {
        this.state = ComponentState.READY;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly PROJECT = PROJECT;
}
