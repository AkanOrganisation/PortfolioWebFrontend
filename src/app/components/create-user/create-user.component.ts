import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {PasswordService} from "../../services";
import {UserType} from "../../types";
import {getEmptyUser} from "../../constants/user.constants";
import {ComponentState} from "../../constants/states.components";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userInput: UserType = getEmptyUser();

  state= ComponentState.LOADING;
  error: any;

  constructor(
    public user: User,
    private passwordService: PasswordService,
  ) {
  }

  async ngOnInit() {
    this.user.gqlErrors.clearErrors()
    if (this.user.authenticated) {
      this.state = ComponentState.COMPLETED;
      this.error = "You already have an account. Please login instead."
    } else {
      this.state = ComponentState.READY;
    }
  }

  async createUser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.user.gqlErrors.clearErrors();
    this.error = null;

    try {
      const result = await this.user.createOrUpdate(this.userInput, true);
      if (!result) {
        form.control.setErrors({server: true})
        Object.keys(this.user.gqlErrors.errorsByField).forEach((key) => {
          form.controls[key]?.setErrors({server: true})
        })
        this.state = ComponentState.READY
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = getEmptyUser();
        this.state = ComponentState.COMPLETED
      }
      return result
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR
      return false;
    }
  }


  async checkPasswordStrength(password: string) {
    return this.passwordService.evaluateStrength(password);
  }


  protected readonly ComponentState = ComponentState;
}
