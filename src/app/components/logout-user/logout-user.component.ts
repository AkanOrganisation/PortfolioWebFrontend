import {Component, OnInit} from '@angular/core';
import {ComponentState} from "../../constants";
import {UserModel} from "../../models";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services";

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit {

  state = ComponentState.LOADING;
  error: any;

  private authStatusSubscription!: Subscription;

  constructor(
    public user: UserService,
    public userModel: UserModel,
    private router: Router,
  ) {

  }

  async ngOnInit() {
    this.userModel.gqlErrors.clearErrors()
    this.authStatusSubscription = this.user.authenticated$.subscribe((authenticated) => {
      this.state = (authenticated) ? ComponentState.READY : ComponentState.COMPLETED;
    });
  }

  async logout() {
    this.state = ComponentState.PROCESSING;
    this.userModel.gqlErrors.clearErrors();
    this.error = null;

    try {
      const result = await this.userModel.logout();
      if (!result) {
        this.state = ComponentState.READY
      } else {
        this.state = ComponentState.COMPLETED
      }
      return result
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR
      return false;
    }
  }


  protected readonly ComponentState = ComponentState;

  cancel() {
    this.state = ComponentState.READY;
  }

  openDialog() {
    this.state = ComponentState.PROCESSING;
  }
}
