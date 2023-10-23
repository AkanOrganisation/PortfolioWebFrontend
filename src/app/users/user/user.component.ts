import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {User} from "../../models";


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {


  constructor(
    public user: User
  ) {
  }

  ngOnInit() {
    this.user.isAuthenticated();
  }

  logout(){
    this.user.logout();
  }

  login(event: Event,email: string, password: string){
    event.preventDefault();
    this.user.email = email;
    this.user.password = password;
    this.user.login();
  }

}
