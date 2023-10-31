import {Component, OnInit, OnDestroy, EventEmitter, Output} from '@angular/core';
import {ComponentState} from "../../../constants";
import {NgForm} from "@angular/forms";
import {OrganiserModel} from "../../../models/organiser.models";
import {getDefaultEventsFilter} from "../../../constants/events-filter.constants";
import {OrganiserFilterType} from "../../../graphql/organiser/organiser.graphql";
import {Subscription} from "rxjs";
import {UserService} from "../../../services";
import {EventNodeType} from "../../../graphql/events/events.graphql";

@Component({
    selector: 'app-events-filter',
    templateUrl: './events-filter.component.html',
    styleUrls: ['./events-filter.component.css']
})
export class EventsFilterComponent implements OnInit, OnDestroy {

    private subscription: Subscription | undefined;


    @Output() eventsList = new EventEmitter<EventNodeType[]>();

    state = ComponentState.LOADING;
    eventsFilter: OrganiserFilterType = {ownedEvents: getDefaultEventsFilter()};

    protected eventsEndCursor = undefined;
    protected hasNextPage = false;

    constructor(
        protected organiserModel: OrganiserModel,
    ) {
        this.initializeEventsFilter();
    }

    ngOnInit(): void {
        this.state = ComponentState.READY;
    }

    private initializeEventsFilter() {

    }

    private handleApiResponse(result: any) {

        this.eventsEndCursor = result.data.organiserPrivate?.ownedEvents?.pageInfo.endCursor;
        this.hasNextPage = result.data.organiserPrivate?.ownedEvents?.pageInfo.hasNextPage;
        this.state = ComponentState.READY;

        this.eventsList.emit(result.data.organiserPrivate?.ownedEvents?.edges.map((edge: any) => edge.node));


    }

    private fetchData(cursorKey?: string, cursorValue?: string) {
        if (!this.eventsFilter.ownedEvents) return;
        this.state = ComponentState.PROCESSING;
        if (cursorKey && cursorValue) {
            this.eventsFilter.ownedEvents[cursorKey] = cursorValue;
        }

        this.subscription = this.organiserModel.getOwnedEventsList(this.eventsFilter).subscribe({
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
            this.eventsFilter.ownedEvents[cursorKey] = undefined;
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
