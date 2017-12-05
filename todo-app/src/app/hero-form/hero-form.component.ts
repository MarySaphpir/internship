import {Component, OnInit} from '@angular/core';
import {TodoService} from '../services/todo.service';

@Component({
  selector: 'todo-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  title:string ='';

  onSubmit() {
    this.todoService.createTodo(this.title)
  }

}
