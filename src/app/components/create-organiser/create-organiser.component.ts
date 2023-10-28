import {Component, OnInit} from '@angular/core';
import {ContactPersonType, OrganiserType} from "../../types";
import {getEmptyOrganiser} from "../../constants/organiser.constants";
import {getEmptyContactPerson} from "../../constants/contact-person.constants";
import {UserModel} from "../../models";
import {NgForm} from '@angular/forms';
import {ComponentState} from "../../constants";
import {UserPermissions} from "../../constants/permissions.constants";
import {Router} from "@angular/router";
import {UserService} from "../../services";
import {OrganiserModel} from "../../models/organiser.models";

@Component({
  selector: 'app-create-organiser',
  templateUrl: './create-organiser.component.html',
  styleUrls: ['./create-organiser.component.css']
})
export class CreateOrganiserComponent implements OnInit {

  state = ComponentState.LOADING;
  error: any;

  organiserInput: OrganiserType = getEmptyOrganiser();
  contactPersonsInput: ContactPersonType[] = [getEmptyContactPerson()];

  constructor(
    public user: UserService,
    public organiserModel: OrganiserModel,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  async createOrganiser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.organiserModel.gqlErrors.clearErrors();
    this.error = null;
    try {
      this.organiserInput.contactPersons = this.contactPersonsInput;
      const result = await this.organiserModel.createOrUpdateOrganiser(this.organiserInput);
      if (result) {
        this.user.addPermission(UserPermissions.ORGANISER);
        this.user.data.organiser = this.organiserInput;
        this.organiserInput = getEmptyOrganiser();
        this.contactPersonsInput = [getEmptyContactPerson()];
        this.state = ComponentState.COMPLETED;
        this.router.navigate(['/']);
        return true;
      } else {
        this.handleErrorsOnForm(form);
        this.state = ComponentState.READY;
        return false;
      }
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR;
      return false;
    }
  }

  private checkUserStatus(): void {
    if (!this.user.authenticated) {
      this.state = ComponentState.COMPLETED;
      this.error = "You must login or create an account first.";
    } else if (this.user.permissions.includes(UserPermissions.ORGANISER)) {
      this.state = ComponentState.COMPLETED
      this.error = "You already have an organiser account.";
    } else {
      this.state = ComponentState.READY;
    }
  }

  private handleErrorsOnForm(form: NgForm): void {
    form.control.setErrors({server: true});
    Object.keys(this.organiserModel.gqlErrors.errorsByField).forEach((key) => {
      form.controls[key]?.setErrors({server: true});
      }
    )
  }

  addContactPerson(): void {
    let contactPerson = getEmptyContactPerson();
    this.contactPersonsInput.push(contactPerson);
  }


  removeContactPerson(index: number): void {
    this.contactPersonsInput.splice(index, 1);
  }


  protected readonly ComponentState = ComponentState;
}

