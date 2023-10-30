import {Component, Input} from '@angular/core';
import {EventDateTimeNodeType} from "../../../../../graphql/events/events.graphql";

@Component({
  selector: 'app-event-datetime',
  templateUrl: './app-event-datetime.component.html',
  styleUrls: ['./app-event-datetime.component.css']
})
export class AppEventDatetimeComponent {

  @Input() eventDateTime!: EventDateTimeNodeType;

}
