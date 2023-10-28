import {Component, OnInit} from '@angular/core';
import {UserModel} from "./models";
import {ComponentState} from "./constants";
import {AppInitializerService} from "./services/initializer/app.initializer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  state = ComponentState.LOADING;
  error: any;

  constructor(
    public user: UserModel,
    private appInitializer: AppInitializerService,
  ) {
  }

  ngOnInit() {
    this.appInitializer.initStatus.subscribe((status) => {
      if (status) {
        this.state = ComponentState.READY;
      } else {
        this.state = ComponentState.ERROR;
      }
    });
  }

  protected readonly ComponentState = ComponentState;
}

