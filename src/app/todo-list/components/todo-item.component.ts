import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="todo-item"
      (click)="onItemClick()"
      (keydown.enter)="onItemClick()"
      tabindex="0"
      role="checkbox"
      [attr.aria-checked]="todo.completed"
    >
      <div class="todo-content">
        <input
          type="checkbox"
          [checked]="todo.completed"
          (click)="onCheckboxClick($event)"
          class="todo-checkbox"
        />
        <span [class.line-through]="todo.completed">
          {{ todo.text }}
        </span>
      </div>
      <button (click)="onDeleteClick($event)" class="delete-button">Delete</button>
    </div>
  `,
  styles: [
    `
      .todo-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        margin: 5px 0;
        width: 300px;
        cursor: pointer;
        user-select: none;
      }
      .todo-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .todo-checkbox {
        width: 20px;
        height: 20px;
      }
      .delete-button {
        color: #ef4444;
        padding: 5px 10px;
        border: none;
        background: none;
        cursor: pointer;
      }
      .delete-button:hover {
        color: #b91c1c;
      }
    `,
  ],
})
export class TodoItemComponent {
  @Input() todo!: Todo;
  @Output() toggleComplete = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  onItemClick() {
    this.toggleComplete.emit();
  }

  onCheckboxClick(event: MouseEvent) {
    event.stopPropagation();
  }

  onDeleteClick(event: MouseEvent) {
    event.stopPropagation();
    this.delete.emit();
  }
}
