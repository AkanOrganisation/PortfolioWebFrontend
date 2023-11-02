import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../../constants";
import {ComponentMode} from "../../../../../../constants/mode.components";

@Component({
    selector: 'app-event-datetime-slots',
    templateUrl: './event-datetime-slots.component.html',
    styleUrls: ['./event-datetime-slots.component.css']
})
export class EventDatetimeSlotsComponent {
    @Input() eventSlotsMax?: number;
    @Input() eventSlotsBooked?: number;
    @Input() eventSlotsAvailable?: boolean;

    eventSlotsMaxInput!: number;

    @Output() eventMaxMemberChange = new EventEmitter<number>();


    state = ComponentState.LOADING;
    mode = ComponentMode.VIEW;

    constructor() {
    }

    ngOnInit() {
        if (this.eventSlotsMax) {
            this.eventSlotsMaxInput = this.eventSlotsMax;
        } else {
            this.eventSlotsMaxInput = 0;
            this.mode = ComponentMode.EDIT;
        }
        this.state = ComponentState.READY;
    }

    toggle() {
        this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.EDIT : ComponentMode.VIEW;
    }

    save() {
        this.eventSlotsMax = this.eventSlotsMaxInput;
        this.eventMaxMemberChange.emit(this.eventSlotsMax);
        this.mode = ComponentMode.VIEW;
    }

    cancel() {
        this.eventSlotsMaxInput = this.eventSlotsMax || 0;
        this.mode = ComponentMode.VIEW;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;


}
