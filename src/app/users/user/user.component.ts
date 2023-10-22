import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit{
  loading = true;
  error: any;
  user: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            allClientsPublic {
              edges {
                  node {
                      displayName
                      id
                  }
              }
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.user = result.data?.user;
        this.loading = result.loading;
        this.error = result.error;
      }, (error: any) => {
        this.error = error;
        this.loading = false;
    });
  }

}
