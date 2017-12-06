import { Pipe, PipeTransform } from '@angular/core';
import {Todo} from "../services/todo.data";

@Pipe({name: 'getCompletedTodo'})
export class FilterTodoPipe implements PipeTransform {
  transform(completedTodos: Todo[]) {
    return completedTodos.filter(todo => todo.completed);
  }
}
