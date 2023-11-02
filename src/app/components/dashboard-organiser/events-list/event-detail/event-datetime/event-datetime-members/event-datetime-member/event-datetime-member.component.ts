import {Component, Input, OnInit} from '@angular/core';
import {EventMemberNodeType} from "../../../../../../../graphql/events/events.graphql";
import {ComponentState} from "../../../../../../../constants";

@Component({
    selector: 'app-event-datetime-member',
    templateUrl: './event-datetime-member.component.html',
    styleUrls: ['./event-datetime-member.component.css']
})
export class EventDatetimeMemberComponent implements OnInit {

    @Input() member!: EventMemberNodeType;

    state = ComponentState.LOADING;

    ngOnInit(): void {
        this.state = ComponentState.READY;
    }

    constructor() {
    }


    protected readonly ComponentState = ComponentState;
}
