import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {ComponentState} from "../../../constants";
import {EventNodeType} from "../../../graphql/events/events.graphql";

@Component({
    selector: 'app-events-list',
    templateUrl: './events-list.component.html',
    styleUrls: ['./events-list.component.css'],
})
export class EventsListComponent implements OnInit {

    state = ComponentState.LOADING;

    @Input() eventsList: EventNodeType[] = [];

    eventsListCreated: EventNodeType[] = [];


    ngOnInit() {
        this.state = ComponentState.READY;
    }


    ngOnChanges(changes: SimpleChanges) {
        if (changes['eventsList']) {
            console.log("Received new data:", this.eventsList);
        }
    }

    protected readonly ComponentState = ComponentState;

    updateEvent(newEvent: EventNodeType) {
        this.eventsListCreated.push(newEvent);
    }
}
