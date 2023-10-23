import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GraphQLErrorsService {
  errorsByField: { [key: string]: string[] } = {};

  setErrors(errors: Array<{ field: string, messages: string[] }>) {
    if (!errors) {
      return;
    }
    errors.forEach(error => {
      this.errorsByField[error.field] = error.messages;
    });
  }

  getErrorsForField(field: string): string[] {
    return this.errorsByField[field] || [];
  }

  clearErrors() {
    this.errorsByField = {};
  }
}
