import { Component } from '@angular/core';
import { EmailValidationService } from '../services/email-validation.service';

@Component({
  selector: 'app-email-validation',
  template: `
    <div>
      <input [(ngModel)]="email" placeholder="Enter your email" />
      <button (click)="checkEmail()">Validate Email</button>
      <p *ngIf="isValid !== null">Email is {{ isValid ? 'valid' : 'invalid' }}</p>
    </div>
  `,
  styles: [],
})
export class EmailValidationPage {
  email: string = '';
  isValid: boolean | null = null;

  constructor(private emailValidationService: EmailValidationService) {}

  checkEmail() {
    this.isValid = this.emailValidationService.validateEmail(this.email);
  }
}
