import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';
import {GraphQLErrorsService} from "../../services/graphql/graphql.errors";

interface User {
  email: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  authenticated = false;
  loading = false;
  error: any;
  user: User | null = null;

  constructor(
    private apollo: Apollo,
    public gqlErrors: GraphQLErrorsService,
  ) {
  }


  login(event: Event, email: string, password: string) {
    event.preventDefault();
    this.gqlErrors.clearErrors();
    this.apollo
    .mutate({
      mutation: gql`
        mutation Login($email: String!, $password: String!) {
          userLoginOrOut(email: $email, password: $password) {
            success
            errors {
              field
              messages
            }
          }
        }
      `,
      variables: {
        email,
        password,
      },
    })
    .subscribe(
      (result: any) => {
        this.authenticated = result.data.userLoginOrOut.success;
        this.loading = result.loading;
        this.gqlErrors.organizeErrors(result.data.userLoginOrOut.errors);
        this.error =  result.error;
      }
    );
  }


  logout() {
    this.apollo
    .mutate({
      mutation: gql`
        mutation {
          userLoginOrOut( logout: true) {
            success
            errors{
              field
              messages
            }
          }
        }
      `,
    })
    .subscribe(
      (result: any) => {
        this.authenticated = !result.data.userLoginOrOut.success;
        this.loading = result.loading;
        this.gqlErrors.organizeErrors(result.data.userLoginOrOut.errors);
        this.error = result.error;
      }
    );
  }

}
