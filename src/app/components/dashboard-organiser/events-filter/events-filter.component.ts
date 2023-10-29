import {Component, OnInit, Output} from '@angular/core';
import {ComponentState} from "../../../constants";
import {NgForm} from "@angular/forms";
import {OrganiserModel} from "../../../models/organiser.models";
import {getDefaultEventsFilter} from "../../../constants/events-filter.constants";
import {OrganiserFilterType} from "../../../graphql/organiser/organiser.graphql";

@Component({
  selector: 'app-events-filter',
  templateUrl: './events-filter.component.html',
  styleUrls: ['./events-filter.component.css']
})
export class EventsFilterComponent implements OnInit {

  state = ComponentState.LOADING;
  eventsFilter: OrganiserFilterType = {ownedEvents: getDefaultEventsFilter()};

  eventsStartCursor: string | undefined = undefined;
  eventsEndCursor: string | undefined = undefined;

  constructor(
    protected organiserModel: OrganiserModel,
  ) {

  }

  ngOnInit(): void {
    this.state = ComponentState.READY;
  }

  applyFilter(filterEventsForm: NgForm) {
    this.state = ComponentState.PROCESSING;
    const result = this.organiserModel.getOwnedEventsList(this.eventsFilter).subscribe({
      next: (result) => {
        console.log(result);
        this.eventsEndCursor = result.data.organiserPrivate.ownedEvents.pageInfo.endCursor;
        console.log(result.data.organiserPrivate.ownedEvents.pageInfo.endCursor);

        this.state = ComponentState.READY;
      },
      error: (error) => {
        console.log(error);
        this.state = ComponentState.ERROR;
      },
      complete: () => {
        console.log('complete');
        this.state = ComponentState.READY;
      }
    })
    this.state = ComponentState.READY;
  }

  nextPage() {
    this.state = ComponentState.PROCESSING;
    const result = this.organiserModel.getOwnedEventsList(this.eventsFilter).subscribe({
      next: (result) => {
        console.log(result);
        this.eventsEndCursor = result.data.organiserPrivate.ownedEvents.pageInfo.endCursor;

        this.state = ComponentState.READY;
      },
      error: (error) => {
        console.log(error);
        this.state = ComponentState.ERROR;
      },
      complete: () => {
        console.log('complete');
        this.state = ComponentState.READY;
      }
    })
  }


  protected readonly ComponentState = ComponentState;


}
