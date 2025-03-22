import { Component } from '@angular/core';
import { EmailValidationService } from '../services/email-validation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-validation',
  template: `
    <div>
      <input [(ngModel)]="email" (ngModelChange)="onEmailChange()" placeholder="Enter your email" />

      @if (isValid !== null) {
        <p>Email is {{ isValid ? 'valid' : 'invalid' }}</p>
      }
    </div>
  `,
  styles: [],
  imports: [FormsModule],
})
export class EmailValidationPage {
  email = '';
  isValid: boolean | null = null;

  constructor(private emailValidationService: EmailValidationService) {}

  onEmailChange() {
    this.checkEmail();
  }

  checkEmail() {
    this.isValid = this.emailValidationService.validateEmail(this.email);
  }
}
