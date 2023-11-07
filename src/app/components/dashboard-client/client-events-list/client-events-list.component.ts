import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientModel} from "../../../models";
import {ComponentState} from "../../../constants";
import {EventDateTimeNodeType} from "../../../graphql/events/events.graphql";

@Component({
    selector: 'app-client-events-list',
    templateUrl: './client-events-list.component.html',
    styleUrls: ['./client-events-list.component.css']
})
export class ClientEventsListComponent implements OnInit {

    eventsList!: EventDateTimeNodeType[];

    state = ComponentState.LOADING;

    @Output() success = new EventEmitter<void>();

    constructor(
        private clientModel: ClientModel,
    ) {
    }

    ngOnInit(): void {
        this.clientModel.getUpcomingEvents().subscribe({
            next: (result: any) => {
                this.eventsList = result.data.clientPrivate.events.edges.map((edge: any) => edge.node.eventDatetime);
                this.state = ComponentState.READY;
            },
            error: (error: any) => {
                console.error(error);
                this.state = ComponentState.ERROR;
            }
        })
    }


    exitEvent(booking: EventDateTimeNodeType) {
        if (!booking || !booking.id) {
            console.error("Not valid booking", booking)
            return;
        }
        if (!confirm("Are you sure you want to exit this event?")) {
            return;
        }
        this.state = ComponentState.PROCESSING;
        this.clientModel.exitEvent(booking.id).subscribe({
            next: (result: any) => {
                if (result.data.clientTakeOrExitEvent.success) {
                    this.success.emit()
                    this.eventsList.splice(this.eventsList.indexOf(booking), 1);
                } else {
                    console.log(result);
                }
                this.state = ComponentState.READY;

            },
            error: (error: any) => {
                this.state = ComponentState.ERROR;
                console.error(error)
            }
        });

    }

    protected readonly ComponentState = ComponentState;
}
