import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  createNewUser: boolean = false;

  constructor(
    public user: User
  ) {
  }

  ngOnInit() {
    this.user.isAuthenticated();
  }

  logout() {
    this.user.logout();
  }

  login(form: NgForm) {
    if (form.valid) {
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.login();
    }
  }

  createUser(form: NgForm) {
    if (form.valid && form.value.password == form.value.password2) {
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.createOrUpdate(true);

    }
  }

  updateUser(form: NgForm) {
    if (form.valid && form.value.password == form.value.confirmPassword) {
      this.user.email = form.value.email;
      this.user.password = form.value.password;
      this.user.createOrUpdate(false);

    }
  }


}
