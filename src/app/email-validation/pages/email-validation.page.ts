import { Component } from '@angular/core';
import { EmailValidationService } from '../services/email-validation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-email-validation',
  template: `
    <div class="container">
      <h1>Validação de email</h1>
      <input
        [(ngModel)]="email"
        (ngModelChange)="onEmailChange()"
        placeholder="Digite seu email"
        class="email-input"
      />

      @if (isValid !== null) {
        <p>Email {{ isValid ? 'válido' : 'inválido' }}</p>
      } @else {
        <p>Digite seu email</p>
      }
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        text-align: center;
      }
      .email-input {
        width: 300px;
        padding: 10px;
        font-size: 16px;
        margin-top: 20px;
      }
    `,
  ],
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
