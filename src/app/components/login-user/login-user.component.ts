import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {getEmptyUser} from "../../constants/user.constants";
import {UserType} from "../../types";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit {

  userInput: UserType = getEmptyUser();

  loading = false;
  ready = false;
  completed = false;
  error: any;

  constructor(
    public user: User,
  ) {

  }

  async ngOnInit() {
    if (this.user.authenticated) {
      this.loading = false;
      this.completed = true;
      this.error = "You are already logged in."
    } else {
      this.ready = true;
      this.loading = false;
    }
  }


  async loginUser(form: NgForm) {
    this.loading = true;
    this.user.gqlErrors.clearErrors();
    this.error = null;
    this.completed = false;
    try {
      const result = await this.user.login(this.userInput);
      this.completed = result;
      if (!this.completed) {
        form.control.setErrors({server: true})
        Object.keys(this.user.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key].setErrors({server: true})
          }
        )
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = getEmptyUser();
      }
      return this.completed
    } catch (error) {
      this.error = error;
      return false;
    } finally {
      this.loading = false;
    }
  }

}

