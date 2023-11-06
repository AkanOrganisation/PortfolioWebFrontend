import {Component, OnInit} from '@angular/core';
import {EventNodeType, eventPublicQueryType} from "../../../graphql/events/events.graphql";
import {ComponentState} from "../../../constants";
import {Subscription} from "rxjs";
import {ComponentMode} from "../../../constants/mode.components";
import {EventModel} from "../../../models/event.models";
import {UserService} from "../../../services";
import {ClientModel} from "../../../models";

@Component({
  selector: 'app-client-events-detail',
  templateUrl: './client-events-detail.component.html',
  styleUrls: ['./client-events-detail.component.css']
})
export class ClientEventsDetailComponent implements OnInit {
  private subscription: Subscription | undefined;

  event: EventNodeType | null = null;
  state: ComponentState = ComponentState.LOADING;
  mode: ComponentMode = ComponentMode.HIDE;

  constructor(
    private eventModel: EventModel,
    private userService: UserService,
    private clientModel: ClientModel,
  ) {
  }

  ngOnInit(): void {

  }

  loadEvent(event: EventNodeType): void {
    this.state = ComponentState.PROCESSING;
    this.subscription = this.eventModel.getEventById(event.id).subscribe({
      next: (result: any) => {
        this.event = {
          ...event,
          ...result.data.eventClientPublic as EventNodeType
        };
        this.toggle();
        this.state = ComponentState.READY;
      },
      error: (error: any) => {
        console.error(error);
        this.state = ComponentState.ERROR;
      }
    });
  }

  toggle(): void {
    this.mode = this.mode === ComponentMode.HIDE ? ComponentMode.SHOW : ComponentMode.HIDE;
    if (this.mode === ComponentMode.HIDE) {
      this.event = null;
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.state = ComponentState.COMPLETED;
    }
  }

  readonly ComponentState = ComponentState;
  readonly ComponentMode = ComponentMode;
}
