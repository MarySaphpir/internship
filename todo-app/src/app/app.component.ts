import {Component} from '@angular/core';
import { Todo } from './services/todo.data';
import { todos } from './services/todo.data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'app';

}
