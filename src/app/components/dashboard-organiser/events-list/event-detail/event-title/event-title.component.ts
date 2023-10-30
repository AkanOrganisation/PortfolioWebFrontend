import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ComponentState} from "../../../../../constants";
import {ComponentMode} from "../../../../../constants/mode.components";

@Component({
  selector: 'app-event-title',
  templateUrl: './event-title.component.html',
  styleUrls: ['./event-title.component.css']
})
export class EventTitleComponent implements OnInit {
  @Input() eventTitle: string | undefined;
  eventTitleInput: string | undefined;
  @Output() eventTitleChange = new EventEmitter<string>();

  state = ComponentState.LOADING;
  mode = ComponentMode.VIEW;

  constructor() {
  }

  ngOnInit() {
    this.eventTitleInput = this.eventTitle;
    this.state = ComponentState.READY;
  }

  toggle() {
    this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.UPDATE : ComponentMode.VIEW;
  }

  save() {
    this.eventTitle = this.eventTitleInput;
    this.eventTitleChange.emit(this.eventTitle);
    this.mode = ComponentMode.VIEW;
  }

  cancel() {
    this.eventTitleInput = this.eventTitle;
    this.mode = ComponentMode.VIEW;
  }

  protected readonly ComponentState = ComponentState;
  protected readonly ComponentMode = ComponentMode;


}
