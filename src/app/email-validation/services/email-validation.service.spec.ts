import { TestBed } from '@angular/core/testing';
import { EmailValidationService } from './email-validation.service';

describe('EmailValidationService', () => {
  let service: EmailValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmailValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should validate correct email', () => {
    expect(service.validateEmail('test@example.com')).toBe(true);
  });

  it('should invalidate incorrect email', () => {
    expect(service.validateEmail('test@.com')).toBe(false);
  });
});
