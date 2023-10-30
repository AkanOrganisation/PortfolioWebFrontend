import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {EventNodeType} from "../../../../graphql/events/events.graphql";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ComponentState} from "../../../../constants";

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
      transition(':leave' , [
        style({opacity: 1, transform: 'translateY(0)'}),
        animate('0.3s ease-in', style({opacity: 0, transform: 'translateY(-100px)'})),
      ]),
    ]),
  ],
})
export class EventDetailComponent implements OnInit, OnDestroy {

  state = ComponentState.LOADING;

  @Input() event!: EventNodeType;

  ngOnInit() {
    this.state = ComponentState.READY;
  }

  ngOnDestroy() {
    this.state = ComponentState.COMPLETED;
  }


  protected readonly ComponentState = ComponentState;
}
