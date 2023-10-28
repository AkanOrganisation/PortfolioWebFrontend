import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../models";
import {NgForm} from "@angular/forms";
import {PasswordService, UserService} from "../../services";
import {UserType} from "../../types";
import {getEmptyUser} from "../../constants/user.constants";
import {ComponentState} from "../../constants/states.components";
import {UserPermissions} from "../../constants/permissions.constants";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  userInput: UserType = getEmptyUser();

  state = ComponentState.LOADING;
  step = Step.CREATE_USER;
  error: any;

  constructor(
    public userModel: UserModel,
    public user: UserService,
    private passwordService: PasswordService,
    private router: Router,
  ) {
  }

  async ngOnInit() {
    this.userModel.gqlErrors.clearErrors()
    if (this.user.authenticated) {
      if (this.user.hasPermission(UserPermissions.CLIENT) || this.user.hasPermission(UserPermissions.ORGANISER)) {
        this.step = Step.COMPLETED;
        this.state = ComponentState.COMPLETED;
        this.router.navigate(['/']);
      } else {
        this.state = ComponentState.READY;
        this.step = Step.CHOICE;
      }
    } else {
      this.state = ComponentState.READY;
    }
  }

  async createUser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.userModel.gqlErrors.clearErrors();
    this.error = null;

    try {
      const result = await this.userModel.createOrUpdate(this.userInput, true);
      if (!result) {
        form.control.setErrors({server: true})
        Object.keys(this.userModel.gqlErrors.errorsByField).forEach((key) => {
          form.controls[key]?.setErrors({server: true})
        })
        this.state = ComponentState.READY
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = getEmptyUser();
        this.state = ComponentState.COMPLETED
        this.navigateToChoice();
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

  navigateToCreateClient() {
    this.step = Step.CREATE_CLIENT;
  }

  navigateToCreateOrganizer() {
    this.step = Step.CREATE_ORGANISER;
  }

  navigateToChoice() {
    this.step = Step.CHOICE;
  }


  protected readonly Step = Step;
}


enum Step {
  CREATE_USER = 1,
  CHOICE = 2,
  CREATE_ORGANISER = 3,
  CREATE_CLIENT = 4,
  COMPLETED = 5,
}
