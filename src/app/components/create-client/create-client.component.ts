import {Component, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {ClientType} from "../../types";
import {getEmptyClient} from "../../constants/client.constants";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {

  loading = true;
  ready = false;
  completed = false;
  error: any;

  clientInput: ClientType = getEmptyClient();

  constructor(
    public user: User,
  ) {

  }


  async ngOnInit(): Promise<boolean> {
    if (!this.user.authenticated) {
      this.loading = false;
      this.completed = true;
      this.error = "You must login or create account first."
      return false;
    } else if (this.user.isClient) {
      this.loading = false;
      this.completed = true;
      this.error = "You already have a client account.";
      return false;
    } else {
      this.ready = true;
      this.loading = false;
      return true;
    }

  }

  async createClient(form: NgForm) {
    this.loading = true;
    this.user.gqlErrors.clearErrors();
    this.error = null;
    this.completed = false;
    try {
      this.completed = await this.user.client.createOrUpdateClient(this.clientInput);
      if (!this.completed) {
        form.control.setErrors({server: true})
        Object.keys(this.user.client?.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key].setErrors({server: true})
          }
        )
      }else {
        this.user.isClient = true;
        this.user.data.client = this.clientInput;
        this.clientInput = getEmptyClient();
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
