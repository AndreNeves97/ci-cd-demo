import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./email-validation/pages/email-validation.page').then((f) => f.EmailValidationPage),
  },
];
