import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ComponentState} from "../../../constants";
import {EventNodeType} from "../../../graphql/events/events.graphql";
import {CreateConstants} from "../../../constants/create.constants";

@Component({
    selector: 'app-add-event',
    templateUrl: './add-event.component.html',
    styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

    @Output() eventCreate = new EventEmitter<EventNodeType>();

    state = ComponentState.LOADING;
    counter = 0;


    constructor() {
    }

    ngOnInit() {
        this.state = ComponentState.READY;
    }

    createEvent() {
        this.state = ComponentState.PROCESSING;
        this.eventCreate.emit({
            id: CreateConstants.CREATE_EVENT + this.counter++,
        });
        this.state = ComponentState.READY;
    }


    protected readonly ComponentState = ComponentState;

}
