import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ComponentState} from "../../../../../constants";
import {ComponentMode} from "../../../../../constants/mode.components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-event-description',
  templateUrl: './event-description.component.html',
  styleUrls: ['./event-description.component.css']
})
export class EventDescriptionComponent {
  @Input() eventDescription: HTMLElement | undefined;
  eventDescriptionInput: HTMLElement | undefined
  @Output() eventDescriptionChange = new EventEmitter<HTMLElement>();

  state = ComponentState.LOADING;
  mode = ComponentMode.VIEW;

  public Editor = ClassicEditor;


  constructor() {
  }

  ngOnInit() {
    this.eventDescriptionInput = this.eventDescription;
    this.state = ComponentState.READY;
  }

  toggle() {
    this.mode = this.mode === ComponentMode.VIEW ? ComponentMode.UPDATE : ComponentMode.VIEW;
  }

  save() {
    this.eventDescription = this.eventDescriptionInput;
    this.eventDescriptionChange.emit(this.eventDescription);
    this.mode = ComponentMode.VIEW;
  }


  cancel() {
    this.eventDescriptionInput = this.eventDescription;
    this.mode = ComponentMode.VIEW;
  }

  protected readonly ComponentState = ComponentState;
  protected readonly ComponentMode = ComponentMode;

}
