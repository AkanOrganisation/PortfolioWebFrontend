import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../../constants";
import {ComponentMode} from "../../../../../../constants/mode.components";
import {StatusConstants} from "../../../../../../constants/status.constants";

@Component({
    selector: 'app-event-datetime-status',
    templateUrl: './event-datetime-status.component.html',
    styleUrls: ['./event-datetime-status.component.css']
})
export class EventDatetimeStatusComponent {
    @Input() eventDateTimeStatus: StatusConstants | undefined;
    eventDateTimeStatusInput: StatusConstants | undefined;
    @Output() eventDateTimeStatusChange = new EventEmitter<StatusConstants>();

    state = ComponentState.LOADING;
    mode = ComponentMode.VIEW;

    constructor() {
    }

    ngOnInit() {
        if (this.eventDateTimeStatus) {
            this.eventDateTimeStatusInput = this.eventDateTimeStatus;
        } else {
            this.eventDateTimeStatusInput = StatusConstants.SCHEDULED;
            this.mode = ComponentMode.UPDATE;
        }
        this.state = ComponentState.READY;
    }

    toggle() {
        this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.UPDATE : ComponentMode.VIEW;
    }

    save() {
        this.eventDateTimeStatus = this.eventDateTimeStatusInput;
        this.eventDateTimeStatusChange.emit(this.eventDateTimeStatus);
        this.mode = ComponentMode.VIEW;
    }

    cancel() {
        this.eventDateTimeStatusInput = this.eventDateTimeStatus;
        this.mode = ComponentMode.VIEW;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;

    protected readonly StatusConstants = StatusConstants;
    StatusOptions = Object.values(StatusConstants);
}
