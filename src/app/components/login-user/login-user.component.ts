import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserModel} from "../../models";
import {NgForm} from "@angular/forms";
import {getEmptyUser} from "../../constants/user.constants";
import {UserType} from "../../types";
import {ComponentState} from "../../constants/states.components";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {UserService} from "../../services";

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
        public userModel: UserModel,
        public user: UserService,
        private router: Router,
    ) {

    }

    ngOnInit() {
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
            const result = await this.userModel.login(this.userInput);
            if (!result) {
                form.control.setErrors({server: true})
                Object.keys(this.userModel.gqlErrors.errorsByField).forEach((key) => {
                        form.controls[key]?.setErrors({server: true})
                    }
                )
                this.state = ComponentState.READY;
            } else {
                this.userInput = getEmptyUser();
                this.state = ComponentState.COMPLETED;
                this.router.navigate(['']);
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

