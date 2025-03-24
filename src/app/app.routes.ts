import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./email-validation/pages/email-validation.page').then((f) => f.EmailValidationPage),
  },
  {
    path: 'todo-list',
    loadComponent: () => import('./todo-list/pages/todo-list.page').then((f) => f.TodoListPage),
  },
];
