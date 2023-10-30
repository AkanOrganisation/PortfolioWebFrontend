import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventDateTimeNodeType, EventNodeType} from "../../../../graphql/events/events.graphql";
import {animate, style, transition, trigger} from "@angular/animations";
import {ComponentState} from "../../../../constants";
import {OrganiserModel} from "../../../../models/organiser.models";
import {ComponentMode} from "../../../../constants/mode.components";

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({opacity: 0, transform: 'translateY(-100px)'}),
        animate('0.3s ease-out', style({opacity: 1, transform: 'translateY(0)'})),
      ]),
      transition(':leave', [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('0.3s ease-in', style({opacity: 0, transform: 'translateY(-100px)'})),
      ]),
    ]),
  ],
})
export class EventDetailComponent implements OnInit, OnDestroy {

  state = ComponentState.LOADING;
  mode = ComponentMode.LIST;
  loaded = false;

  @Input() event!: EventNodeType;

  constructor(
    private organiserModel: OrganiserModel,
  ) {

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

  toggle() {
    this.state = ComponentState.LOADING;
    if (!this.loaded) {
      this.loadEvent()
    }
    this.mode = this.mode === ComponentMode.LIST ? ComponentMode.DETAIL : ComponentMode.LIST;
    this.state = ComponentState.READY;
  }

  loadEvent() {
    if (!this.event.id) return console.error('Event ID not found');

    // this.organiserModel.getEvent(this.event.id).subscribe((event) => {
    //   this.event = event;
    // });
  }

  getDates() {
    return this.event.dates?.edges.map((edge) => edge.node) || [];
  }

  protected readonly ComponentMode = ComponentMode;
}
