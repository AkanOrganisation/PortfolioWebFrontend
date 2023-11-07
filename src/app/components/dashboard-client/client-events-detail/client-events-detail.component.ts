import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventDateTimeNodeType, EventNodeType, eventPublicQueryType} from "../../../graphql/events/events.graphql";
import {ComponentState} from "../../../constants";
import {Subscription} from "rxjs";
import {ComponentMode} from "../../../constants/mode.components";
import {EventModel} from "../../../models/event.models";
import {UserService} from "../../../services";
import {ClientModel} from "../../../models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'app-client-events-detail',
    templateUrl: './client-events-detail.component.html',
    styleUrls: ['./client-events-detail.component.css']
})
export class ClientEventsDetailComponent implements OnInit {
    private subscription: Subscription | undefined;

    event: EventNodeType | null = null;
    state: ComponentState = ComponentState.LOADING;
    mode: ComponentMode = ComponentMode.HIDE;

    @Output() close = new EventEmitter<void>();
    @Output() success = new EventEmitter<void>();


    minDate: Date = new Date();


    selectedDate: Date | null = null;
    selectedDateTime: EventDateTimeNodeType | null = null;

    constructor(
        private eventModel: EventModel,
        private userService: UserService,
        private clientModel: ClientModel,
    ) {
    }

    ngOnInit(): void {

    }

    loadEvent(event: EventNodeType) {
        this.state = ComponentState.PROCESSING;
        this.subscription = this.eventModel.getEventById(event.id).subscribe({
                next: (result: any) => {
                    this.event = {
                        ...event,
                        ...result.data.eventClientPublic as EventNodeType
                    };
                    this.toggle();
                    this.state = ComponentState.READY;

                },
                error: (error: any) => {
                    console.error(error);
                    this.state = ComponentState.ERROR;
                }
            }
        );
    }


    get eventDates(): Date[] {
        return this.event?.dates?.edges
            .filter((edge) => edge.node.datetime !== undefined)
            .map((edge) =>
                new Date(edge.node.datetime as Date)
            ) ?? [];
    }


    public eventTimes(searchDate: Date | null) {
        if (!searchDate) {
            return [];
        }
        return this.event?.dates?.edges.filter((edge) =>
            edge.node.datetime !== undefined &&
            new Date(edge.node.datetime).toDateString() === searchDate.toDateString()).map(
            (edge) => edge.node) ?? [];
    }

    eventDatesFilter = (d: Date | null): boolean => {
        if (!d) {
            return false;
        }
        return this.eventDates.some(eventDate =>
            eventDate.toDateString() === d.toDateString()
        );
    };


    toggle(): void {
        this.mode = this.mode === ComponentMode.HIDE ? ComponentMode.SHOW : ComponentMode.HIDE;
        if (this.mode === ComponentMode.HIDE
        ) {
            this.event = null;
            if (this.subscription) {
                this.subscription.unsubscribe();
            }
            this.state = ComponentState.COMPLETED;
            this.close.emit();
        }
    }

    readonly ComponentState = ComponentState;
    readonly ComponentMode = ComponentMode;

    takeEvent() {
        if (!this.selectedDateTime || !this.selectedDateTime.id) {
            console.log(this.selectedDateTime)
            console.error('No date selected');
            return;
        }
        this.state = ComponentState.PROCESSING;
        this.clientModel.takeEvent(this.selectedDateTime.id as string).subscribe({
            next: (result: any) => {
                this.state = ComponentState.COMPLETED;
                if (result.data.clientTakeOrExitEvent.success) {
                    this.success.emit()
                }
                this.toggle();
            },
            error: (error: any) => {
                console.error(error);
                this.state = ComponentState.ERROR;
            }
        })
    }
}
