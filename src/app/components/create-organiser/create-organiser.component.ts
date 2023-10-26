import {Component, OnInit} from '@angular/core';
import {ContactPersonType, OrganiserType} from "../../types";
import {getEmptyOrganiser} from "../../constants/organiser.constants";
import {getEmptyContactPerson} from "../../constants/contact-person.constants";
import {User} from "../../models";
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-organiser',
  templateUrl: './create-organiser.component.html',
  styleUrls: ['./create-organiser.component.css']
})
export class CreateOrganiserComponent implements OnInit {

  loading = true;
  ready = false;
  completed = false;
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
    this.loading = true;
    this.error = null;
    this.completed = false;
    try {
      this.organiserInput.contactPersons = this.contactPersonsInput;
      this.completed = await this.user.organiser.createOrUpdateOrganiser(this.organiserInput);
      if (this.completed) {
        this.user.isOrganiser = true;
        this.user.data.organiser = this.organiserInput;
        this.organiserInput = getEmptyOrganiser();
      } else {
        this.handleErrorOnForm(form);
      }
    } catch (error) {
      this.error = error;
    } finally {
      this.loading = false;
    }
  }

  private checkUserStatus(): void {
    this.loading = false;
    if (!this.user.authenticated) {
      this.error = "You must login or create an account first.";
      this.completed = true;
    } else if (this.user.isOrganiser) {
      this.error = "You already have an organiser account.";
      this.completed = true;
    } else {
      this.ready = true;
    }
  }

  private handleErrorOnForm(form: NgForm): void {
    form.control.setErrors({server: true});
    Object.keys(this.user.organiser?.gqlErrors.errorsByField).forEach((key) => {
        form.control.get(key)?.setErrors({server: true});
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


}

