import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ComponentState} from "../../../../../constants";
import {EventDateTimeNodeType} from "../../../../../graphql/events/events.graphql";
import {CreateConstants} from "../../../../../constants/create.constants";

@Component({
    selector: 'app-event-add-datetime',
    templateUrl: './event-add-datetime.component.html',
    styleUrls: ['./event-add-datetime.component.css']
})
export class EventAddDatetimeComponent implements OnInit {

    @Output() eventDateTimeCreate = new EventEmitter<EventDateTimeNodeType>();

    state = ComponentState.LOADING;
    counter = 0;


    constructor() {
    }

    ngOnInit() {
        this.state = ComponentState.READY;
    }

    createEventDateTime() {
        this.state = ComponentState.PROCESSING;
        this.eventDateTimeCreate.emit({
            id: CreateConstants.CREATE_EVENT_DATETIME + this.counter++,
        });
        this.state = ComponentState.READY;
    }


    protected readonly ComponentState = ComponentState;
}
