import {InMemoryDbService} from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {title: 'todo 1', completed: true},
      {title: 'todo 2', completed: false},
      {title: 'todo 3', completed: false}
    ];
    return { todos: todos }
  }
}
