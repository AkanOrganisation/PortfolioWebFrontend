import { Component } from '@angular/core';
import {UserService} from "../../services";
import {UserPermissions} from "../../constants";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
   public user : UserService
  ) {
  }

  protected readonly UserPermissions = UserPermissions;
}
