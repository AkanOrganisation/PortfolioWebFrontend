import {Component, OnInit} from '@angular/core';
import {ContactPersonType, OrganiserType} from "../../types";
import {getEmptyOrganiser} from "../../constants/organiser.constants";
import {getEmptyContactPerson} from "../../constants/contact-person.constants";
import {User} from "../../models";
import {NgForm} from '@angular/forms';
import {ComponentState} from "../../constants";
import {UserPermissions} from "../../constants/permissions.constants";

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
    public user: User,
  ) {
  }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  async createOrganiser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.user.organiser.gqlErrors.clearErrors();
    this.error = null;
    try {
      this.organiserInput.contactPersons = this.contactPersonsInput;
      const result = await this.user.organiser.createOrUpdateOrganiser(this.organiserInput);
      if (result) {
        this.user.permissions.push(UserPermissions.ORGANISER);
        this.user.data.organiser = this.organiserInput;
        this.organiserInput = getEmptyOrganiser();
        this.contactPersonsInput = [getEmptyContactPerson()];
        this.state = ComponentState.COMPLETED;
      } else {
        this.handleErrorOnForm(form);
        this.state = ComponentState.READY;
      }
      return result;
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

  private handleErrorOnForm(form: NgForm): void {
    form.control.setErrors({server: true});
    Object.keys(this.user.organiser?.gqlErrors.errorsByField).forEach((key) => {
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
