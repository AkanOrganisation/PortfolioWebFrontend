import {Component, OnInit} from '@angular/core';
import {ComponentState} from "../../constants";
import {User} from "../../models";

@Component({
  selector: 'app-logout-user',
  templateUrl: './logout-user.component.html',
  styleUrls: ['./logout-user.component.css']
})
export class LogoutUserComponent implements OnInit{

  state = ComponentState.LOADING;
  error: any;

  constructor(
    public user: User,
  ) {

  }

  async ngOnInit() {
    this.user.gqlErrors.clearErrors()
    if (!this.user.authenticated) {
      this.state = ComponentState.COMPLETED;
      this.error = "You are not logged in."
    } else {
      this.state = ComponentState.READY;
    }
  }

  async logout() {
    this.state = ComponentState.PROCESSING;
    this.user.gqlErrors.clearErrors();
    this.error = null;

    try {
      const result = await this.user.logout();
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
    this.state = ComponentState.COMPLETED;
  }

  openDialog() {
    this.state = ComponentState.PROCESSING;
  }
}
