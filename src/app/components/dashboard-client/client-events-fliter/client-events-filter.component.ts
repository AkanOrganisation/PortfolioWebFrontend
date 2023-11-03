import {Component, EventEmitter, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {
    EventNodeType,
    EventsDateTimeFilterConnectionType,
    EventsFilterConnectionType
} from "../../../graphql/events/events.graphql";
import {getDefaultDateTimesFilter, getDefaultEventsFilter} from "../../../constants/events-filter.constants";
import {NgForm} from "@angular/forms";
import {ComponentState} from "../../../constants";
import {ClientModel} from "../../../models";
import {EventModel} from "../../../models/event.models";

@Component({
    selector: 'app-client-events-filter',
    templateUrl: './client-events-filter.component.html',
    styleUrls: ['./client-events-filter.component.css']
})
export class ClientEventsFilterComponent {
    private subscription: Subscription | undefined;


    @Output() eventsList = new EventEmitter<EventNodeType[]>();

    state = ComponentState.LOADING;
    eventsFilter: EventsFilterConnectionType = getDefaultEventsFilter();
    eventDateTimesFilter: EventsDateTimeFilterConnectionType = getDefaultDateTimesFilter();

    datesFilter = {
        from: new Date(),
        to: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    }

    protected eventsEndCursor = undefined;
    protected hasNextPage = false;

    constructor(
        protected clientModel: ClientModel,
        protected eventModel: EventModel,
    ) {
        this.initializeEventsFilter();
    }

    ngOnInit(): void {
        this.state = ComponentState.READY;
    }

    private initializeEventsFilter() {

    }

    private handleApiResponse(result: any) {

        this.eventsEndCursor = result.data.allEventsClientPublic?.pageInfo.endCursor;
        this.hasNextPage = result.data.allEventsClientPublic?.pageInfo.hasNextPage;


        this.eventsList.emit(result.data.allEventsClientPublic?.edges.map((edge: any) => edge.node));

        this.state = ComponentState.READY;

    }

    private fetchData(cursorKey?: string, cursorValue?: string) {
        this.state = ComponentState.PROCESSING;
        if (cursorKey && cursorValue) {
            this.eventsFilter[cursorKey] = cursorValue;
        }
        console.log(this.datesFilter)
        this.eventDateTimesFilter.filter.datetime.range = [
            new Date(Date.UTC(this.datesFilter.from.getFullYear(), this.datesFilter.from.getMonth(), this.datesFilter.from.getDate())),
            new Date(Date.UTC(this.datesFilter.to.getFullYear(), this.datesFilter.to.getMonth(), this.datesFilter.to.getDate() + 1))
        ];
        this.subscription = this.eventModel.getEventsList(
            this.eventsFilter,
            this.eventDateTimesFilter
        ).subscribe({
            next: this.handleApiResponse.bind(this),
            error: (error) => {
                console.log(error);
                this.state = ComponentState.ERROR;
            },
            complete: () => {
                console.log('complete');
                this.state = ComponentState.READY;
            }
        });

        if (cursorKey) {
            this.eventsFilter[cursorKey] = undefined;
        }
    }

    applyFilter(filterEventsForm: NgForm) {
        this.fetchData();
    }

    nextPage() {
        this.fetchData('after', this.eventsEndCursor);
    }


    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    protected readonly ComponentState = ComponentState;
}
