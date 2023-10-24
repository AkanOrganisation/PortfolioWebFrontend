import { Injectable } from '@angular/core';
import * as zxcvbn from 'zxcvbn';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  constructor() { }

  evaluateStrength(password: string) {
    const result = zxcvbn(password);

    return {
      score: result.score,
      feedback: result.feedback.suggestions
    };
  }

  checkPasswordsMatch(password: string, password2: string) {
    return password === password2;
  }

}
