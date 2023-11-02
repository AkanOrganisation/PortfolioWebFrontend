import {Component, EventEmitter, Input, Output} from '@angular/core';
import {EventDateTimeNodeType, EventMemberNodeType} from "../../../../../graphql/events/events.graphql";
import {ComponentState} from "../../../../../constants";

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
        this.state = ComponentState.READY;
    }


    protected readonly ComponentState = ComponentState;


    updateStatus(newStatus: string) {
        this.eventDateTime.status = newStatus;
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    updateDateTime(newDateTime: Date) {
        this.eventDateTime.datetime = newDateTime;
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    updateSlots(newMaxMembers: number) {
        this.eventDateTime.maxMembers = newMaxMembers;
        this.eventDateTime.freeSlotsCount = this.eventDateTime.maxMembers - this.membersCount;
        this.eventDateTime.freeSlotsAvailable = this.eventDateTime.freeSlotsCount > 0;
        this.eventDateTimeChange.emit(this.eventDateTime);
    }

    get membersCount(): number {
        return this.eventDateTime.members?.edges?.length || 0;
    }

    get membersList(): EventMemberNodeType[] {
        return this.eventDateTime.members?.edges?.map((edge) => edge.node) || [];
    }

}
