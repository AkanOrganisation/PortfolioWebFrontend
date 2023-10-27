import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {getEmptyUser} from "../../constants/user.constants";
import {UserType} from "../../types";
import {ComponentState} from "../../constants/states.components";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {



  userInput: UserType = getEmptyUser();

  state = ComponentState.LOADING;
  error: any;

  constructor(
    public user: User,
  ) {

  }

  async ngOnInit() {
    this.state = (this.user.authenticated) ? ComponentState.COMPLETED : ComponentState.READY;
  }


  async loginUser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.error = null;
    try {
      const result = await this.user.login(this.userInput);
      if (!result) {
        form.control.setErrors({server: true})
        Object.keys(this.user.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key]?.setErrors({server: true})
          }
        )
        this.state = ComponentState.READY;
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = getEmptyUser();
        this.state = ComponentState.COMPLETED;
      }
      return result
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR;
      return false;
    }
  }

  protected readonly ComponentState = ComponentState;
}

