import { Component, OnInit, Input } from '@angular/core';
import { Todo } from '../services/todo.data';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];
  color: string;

  constructor(private todoService: TodoService) {
    this.todos = [];
  }

  ngOnInit() {
    this.todos = this.todoService.getTodos();
  }


  toggle(todo: Todo) {
    this.todoService.toggleTodo(todo);
  }

  delete(todo: Todo) {
    this.todoService.deleteTodo(todo);
  }
}
