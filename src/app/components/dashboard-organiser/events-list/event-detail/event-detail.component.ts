import {Component, Input, OnDestroy, OnInit} from "@angular/core";
import {ComponentState} from "../../../../constants";
import {ComponentMode} from "../../../../constants/mode.components";
import {EventDateTimeNodeType, EventNodeType} from "../../../../graphql/events/events.graphql";
import {OrganiserModel} from "../../../../models/organiser.models";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  animations: [
    trigger('cardAnimation', [
      // Entry animation
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(100px)'}),
        animate('0.3s ease-out', style({opacity: 1, transform: 'translateY(0)'}))
      ]),
      // Exit animation
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('0.3s ease-in', style({opacity: 0, transform: 'translateY(-100px)'}))
      ]),
    ])
  ]
})
export class EventDetailComponent implements OnInit, OnDestroy {

  state = ComponentState.LOADING;
  mode = ComponentMode.LIST;
  loaded = false;
  private edited = false;

  @Input() event!: EventNodeType;

  constructor(private organiserModel: OrganiserModel) {
  }

  ngOnInit() {
    this.mode = ComponentMode.LIST;
    this.state = ComponentState.READY;
  }

  ngOnDestroy() {
    this.state = ComponentState.COMPLETED;
  }

  protected readonly ComponentState = ComponentState;

  trackById(index: number, item: EventDateTimeNodeType) {
    return item.id || index;
  }

  async toggle() {
    if (this.mode === ComponentMode.LIST && !this.loaded) {
      this.state = ComponentState.LOADING;
      await this.loadEvent();
    }

    // Animation will be triggered by Angular as this.mode changes
    this.mode = this.mode === ComponentMode.LIST ? ComponentMode.DETAIL : ComponentMode.LIST;
  }

  async loadEvent() {
    if (!this.event.id) {
      console.error('Event ID not found');
      this.state = ComponentState.ERROR;
      return;
    }

    this.organiserModel.getEventDetails(this.event.id).subscribe({
      next: (result) => {
        if (result.data.eventOrganiserPrivate) {
          this.event = result.data.eventOrganiserPrivate;
          this.loaded = true;
          this.state = ComponentState.READY;
        }
      },
      error: (error) => {
        console.error(error);
        this.state = ComponentState.ERROR;
      }
    });
  }

  getDates() {
    return this.event.dates?.edges.map((edge) => edge.node) || [];
  }

  protected readonly ComponentMode = ComponentMode;

  updateEventsTitle(newTitle: string) {
    this.event.title = newTitle;
    this.edited = true;
  }

  updateEventsCategory(newCategory: string) {
    this.event.title = newCategory;
    this.edited = true;

  }

  updateEventsDescription(newDescription: HTMLElement) {
    this.event.description = newDescription;
    this.edited = true;
  }
}
