import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {ClientType} from "../../types";
import {getEmptyClient} from "../../constants/client.constants";
import {ComponentState} from "../../constants";
import {UserPermissions} from "../../constants/permissions.constants";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  state = ComponentState.LOADING;
  error: any;

  clientInput: ClientType = getEmptyClient();

  constructor(
    public user: User,
  ) {

  }


  async ngOnInit(): Promise<boolean> {
    if (!this.user.authenticated) {
      this.state = ComponentState.COMPLETED;
      this.error = "You must login or create account first."
      return false;
    } else if (this.user.permissions.includes(UserPermissions.CLIENT)) {
      this.state = ComponentState.COMPLETED;
      this.error = "You already have a client account.";
      return false;
    } else {
      this.state = ComponentState.READY;
      return true;
    }

  }

  async createClient(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.user.client.gqlErrors.clearErrors();
    this.error = null;
    try {
      const result = await this.user.client.createOrUpdateClient(this.clientInput);
      if (!result) {
        form.control.setErrors({server: true})
        Object.keys(this.user.client?.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key]?.setErrors({server: true})
          }
        )
        this.state = ComponentState.READY
      } else {
        this.user.permissions.push(UserPermissions.CLIENT);
        this.user.data.client = this.clientInput;
        this.clientInput = getEmptyClient();
        this.state = ComponentState.COMPLETED;
      }
      return result
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR
      return false;
    }
  }

  protected readonly ComponentState = ComponentState;
}