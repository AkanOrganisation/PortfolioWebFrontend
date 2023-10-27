import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../models";
import {NgForm} from "@angular/forms";
import {getEmptyUser} from "../../constants/user.constants";
import {UserType} from "../../types";
import {ComponentState} from "../../constants/states.components";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit, OnDestroy {

  userInput: UserType = getEmptyUser();

  state = ComponentState.LOADING;
  error: any;


  private authStatusSubscription!: Subscription;

  constructor(
    public user: User,
    private router: Router,
  ) {

  }

  ngOnInit() {
    // this.state = (this.user.authenticated) ? ComponentState.COMPLETED : ComponentState.READY;
    this.authStatusSubscription = this.user.authenticated$.subscribe((authenticated) => {
      this.state = (authenticated) ? ComponentState.COMPLETED : ComponentState.READY;
      if (authenticated) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }


  async loginUser(form: NgForm) {
    this.state = ComponentState.PROCESSING;
    this.error = null;
    try {
      const result = await this.user.login(this.userInput);
      if (!result) {
        form.control.setErrors({server: true})
        Object.keys(this.user.gqlErrors.errorsByField).forEach((key) => {
            form.controls[key]?.setErrors({server: true})
          }
        )
        this.state = ComponentState.READY;
      } else {
        this.user.data.email = this.userInput.email;
        this.userInput = getEmptyUser();
        this.state = ComponentState.COMPLETED;
      }
      return result
    } catch (error) {
      this.error = error;
      this.state = ComponentState.ERROR;
      return false;
    }
  }

  protected readonly ComponentState = ComponentState;
}

