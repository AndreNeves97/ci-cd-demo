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

  test.each(['test@example.com', 'test.test@gmail.com', 'test@gmail.com.br'])(
    'should validate correct email [%s]',
    (email) => {
      expect(service.validateEmail(email)).toBe(true);
    },
  );

  test.each(['test@.com', 'test@gmail.com.', 'test@gmail@hotmail.com'])(
    'should invalidate incorrect email [%s]',
    (email) => {
      expect(service.validateEmail(email)).toBe(false);
    },
  );
});
