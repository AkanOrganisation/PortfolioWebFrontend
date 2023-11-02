import {Component, Input} from '@angular/core';
import {ComponentState} from "../../../../../../constants";
import {ComponentMode} from "../../../../../../constants/mode.components";
import {EventMemberType} from "../../../../../../types/event.types";

@Component({
    selector: 'app-event-datetime-members',
    templateUrl: './event-datetime-members.component.html',
    styleUrls: ['./event-datetime-members.component.css']
})
export class EventDatetimeMembersComponent {
    @Input() eventMembers?: EventMemberType[];

    state = ComponentState.LOADING;
    mode = ComponentMode.HIDE;

    constructor() {
    }

    ngOnInit() {
        this.state = ComponentState.READY;
    }

    toggle() {
        this.mode = this.mode === ComponentMode.HIDE ? ComponentMode.SHOW : ComponentMode.HIDE;
    }


    protected readonly ComponentState = ComponentState;
    protected readonly ComponentMode = ComponentMode;


}
