import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { EmailValidationPage } from './email-validation.page';
import { EmailValidationService } from '../services/email-validation.service';

describe('EmailValidationPage', () => {
  let component: EmailValidationPage;
  let fixture: ComponentFixture<EmailValidationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmailValidationPage],
      imports: [FormsModule],
      providers: [EmailValidationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailValidationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate email', () => {
    component.email = 'test@example.com';
    component.checkEmail();
    expect(component.isValid).toBe(true);
  });

  it('should invalidate email', () => {
    component.email = 'test@.com';
    component.checkEmail();
    expect(component.isValid).toBe(false);
  });
});
