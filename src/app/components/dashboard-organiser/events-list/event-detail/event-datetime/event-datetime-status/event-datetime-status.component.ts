import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../../constants";
import {ComponentMode} from "../../../../../../constants/mode.components";

@Component({
  selector: 'app-event-datetime-status',
  templateUrl: './event-datetime-status.component.html',
  styleUrls: ['./event-datetime-status.component.css']
})
export class EventDatetimeStatusComponent {
  @Input() eventDateTimeStatus: string | undefined;
  eventDateTimeStatusInput: string | undefined;
  @Output() eventDateTimeStatusChange = new EventEmitter<string>();

  state = ComponentState.LOADING;
  mode = ComponentMode.VIEW;

  constructor() {
  }

  ngOnInit() {
    this.eventDateTimeStatusInput = this.eventDateTimeStatus;
    this.state = ComponentState.READY;
  }

  toggle() {
    this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.UPDATE : ComponentMode.VIEW;
  }

  save() {
    this.eventDateTimeStatus = this.eventDateTimeStatusInput;
    this.eventDateTimeStatusChange.emit(this.eventDateTimeStatus);
    this.mode = ComponentMode.VIEW;
  }

  cancel() {
    this.eventDateTimeStatusInput = this.eventDateTimeStatus;
    this.mode = ComponentMode.VIEW;
  }

  protected readonly ComponentState = ComponentState;
  protected readonly ComponentMode = ComponentMode;

}
