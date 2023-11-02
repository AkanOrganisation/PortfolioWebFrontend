import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../constants";
import {EventDateTimeType, EventMemberType} from "../../../../../types/event.types";
import {EventDateTimeNodeType} from "../../../../../graphql/events/events.graphql";
import {StatusConstants} from "../../../../../constants/status.constants";

@Component({
    selector: 'app-event-datetime',
    templateUrl: './app-event-datetime.component.html',
    styleUrls: ['./app-event-datetime.component.css']
})
export class AppEventDatetimeComponent {

    @Input() eventDateTime!: EventDateTimeNodeType;
    @Output() eventDateTimeChange = new EventEmitter<EventDateTimeNodeType>();


    state = ComponentState.LOADING;


    constructor() {
    }

    ngOnInit() {
        if (!this.eventDateTime) {
            this.eventDateTime = {};
        }
        if (!this.eventDateTime.editedFields) {
            this.eventDateTime.editedFields = {};
        }
        this.state = ComponentState.READY;
    }


    protected readonly ComponentState = ComponentState;


    updateStatus(newStatus: StatusConstants) {
        this.eventDateTime.status = newStatus;
        if (this.eventDateTime.editedFields) {
            this.eventDateTime.editedFields['status'] = true;
        }
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    updateDateTime(newDateTime: Date) {
        this.eventDateTime.datetime = newDateTime;
        if (this.eventDateTime.editedFields) {
            this.eventDateTime.editedFields['datetime'] = true;
        }
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    updateSlots(newMaxMembers: number) {
        this.eventDateTime.maxMembers = newMaxMembers;
        if (this.eventDateTime.editedFields) {
            this.eventDateTime.editedFields['maxMembers'] = true;
        }
        this.eventDateTime.freeSlotsCount = this.eventDateTime.maxMembers - this.membersCount;
        this.eventDateTime.freeSlotsAvailable = this.eventDateTime.freeSlotsCount > 0;
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    get membersCount(): number {
        return this.eventDateTime.members?.edges.length || 0;
    }

    get membersList(): EventMemberType[] {
        return this.eventDateTime.members?.edges.map((edge: any) => edge.node) || [];
    }

}
