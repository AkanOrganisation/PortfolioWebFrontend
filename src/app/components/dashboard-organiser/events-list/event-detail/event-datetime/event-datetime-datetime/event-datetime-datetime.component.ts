import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {ComponentState} from "../../../../../../constants";
import {ComponentMode} from "../../../../../../constants/mode.components";

@Component({
    selector: 'app-event-datetime-datetime',
    templateUrl: './event-datetime-datetime.component.html',
    styleUrls: ['./event-datetime-datetime.component.css']
})
export class EventDatetimeDatetimeComponent implements OnInit {
    @Input() eventDateTime?: Date;
    @Output() eventDateTimeChange = new EventEmitter<Date>();

    eventDateInput!: Date;
    eventTimeInput!: string;

    state = ComponentState.LOADING;
    mode = ComponentMode.VIEW;

    eventDateFormatted!: string;
    eventTimeFormatted!: string;

    constructor() {
    }

    ngOnInit() {
        this.eventDateTime = this.eventDateTime ? new Date(this.eventDateTime) : new Date();

        this.eventDateInput = new Date(this.eventDateTime);
        this.eventTimeInput = this.eventDateTime.toLocaleTimeString();

        this.eventDateFormatted = this.eventDateTime.toLocaleDateString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
        this.eventTimeFormatted = this.eventDateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
        this.state = ComponentState.READY;
    }

    toggle() {
        this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.UPDATE : ComponentMode.VIEW;
    }

    save() {
        this.eventDateTime = new Date(this.eventDateInput.toDateString() + ' ' + this.eventTimeInput);
        this.eventDateFormatted = this.eventDateTime.toLocaleDateString(navigator.language, {year: 'numeric', month: 'long', day: 'numeric'});
        this.eventTimeFormatted = this.eventDateTime.toLocaleTimeString(navigator.language, {hour: '2-digit', minute: '2-digit'});
        this.eventDateTimeChange.emit(this.eventDateTime as Date);
        this.mode = ComponentMode.VIEW;
    }

    cancel() {
        this.mode = ComponentMode.VIEW;
    }

    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;
}
