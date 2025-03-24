import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TodoItemComponent } from '../components/todo-item.component';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TodoItemComponent],
  template: `
    <div class="container">
      <h1>Todo List</h1>

      <input
        type="text"
        [(ngModel)]="newTodoText"
        (keyup.enter)="addTodo()"
        placeholder="Add new todo..."
        class="todo-input"
      />

      <div class="todo-list">
        @for (todo of todos; track todo.id) {
          <app-todo-item
            [todo]="todo"
            (toggleComplete)="toggleTodo(todo)"
            (delete)="deleteTodo(todo)"
          ></app-todo-item>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        text-align: center;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .todo-input {
        width: 300px;
        padding: 10px;
        font-size: 16px;
        margin: 20px 0;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
      .todo-list {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        max-width: 300px;
      }
    `,
  ],
})
export class TodoListPage {
  todos: Todo[] = [];
  newTodoText = '';

  addTodo() {
    if (this.newTodoText.trim()) {
      this.todos.push({
        id: Date.now(),
        text: this.newTodoText.trim(),
        completed: false,
      });
      this.newTodoText = '';
    }
  }

  toggleTodo(todo: Todo) {
    todo.completed = !todo.completed;
  }

  deleteTodo(todoToDelete: Todo) {
    this.todos = this.todos.filter((todo) => todo.id !== todoToDelete.id);
  }
}
