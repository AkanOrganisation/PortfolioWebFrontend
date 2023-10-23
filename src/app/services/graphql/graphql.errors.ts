import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphQLErrorsService {
  errorsByField: { [key: string]: string[] } = {};

  organizeErrors(errors: Array<{ field: string, messages: string[] }>) {
    errors.forEach(error => {
      this.errorsByField[error.field] = error.messages;
    });
  }

  getErrorsForField(field: string): string[] {
    return this.errorsByField[field] || [];
  }
}
