import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit{
  authenticated = false;
  loading = true;
  error: any;
  user: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {

  }

  login(event: Event, email: string, password: string) {
    event.preventDefault();
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
      ({ data, loading }) => {
        this.loading = loading;
        this.authenticated = false;
        console.log(data);
      },
      (errors) => {
        this.loading = false;
        this.error = errors;
      }
    );
  }


  logout(){
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
        ({ data, loading }) => {
          this.loading = loading;
          console.log(data);
        },
        (errors) => {
          this.loading = false;
          this.error = errors;
        }
      );
  }


  protected readonly event = event;
}
