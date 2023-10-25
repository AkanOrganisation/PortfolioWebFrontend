import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {PasswordService} from "../../services";
import {UserType} from "../../types";
import {EMPTY_USER} from "../../constants/user.constants";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userInput: UserType = EMPTY_USER;

  loading = true;
  ready = false;
  completed = false;
  error: any;

  constructor(
    public user: User,
    private passwordService: PasswordService,
  ) {
  }

  async ngOnInit() {
    if (this.user.authenticated) {
      this.loading = false;
      this.completed = true;
      this.error = "You already have an account. Please login instead."
    } else {
      this.ready = true;
      this.loading = false;
    }
  }

  async createUser(form: NgForm) {
    this.loading = true;
    this.user.gqlErrors.clearErrors();
    if (form.valid) {
      if (form.value.password != form.value.password2) {
        this.user.gqlErrors.addError("password2", "Passwords do not match.");
        return;
      }
    }
    this.error = null;
    this.completed = false;
    try {
      this.completed = await this.user.createOrUpdate(this.userInput, true);
      if (!this.completed) {
        form.control.setErrors({server: true})
        Object.keys(this.user.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key].setErrors({server: true})
          }
        )
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = EMPTY_USER;
      }
      return this.completed
    } catch (error) {
      this.error = error;
      return false;
    } finally {
      this.loading = false;
    }
  }


  async checkPasswordStrength(password: string) {
    return this.passwordService.evaluateStrength(password);
  }


}
