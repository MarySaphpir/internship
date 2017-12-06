import {Component, OnInit} from '@angular/core';
import { Location } from '@angular/common';
import { FormControl } from '@angular/forms';

import {TodoService} from '../services/todo.service';

@Component({
  selector: 'todo-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  title: string = '';

  constructor(private todoService: TodoService,
              private location: Location) { }

  ngOnInit() {
  }

  onSubmit() {
    this.todoService.createTodo(this.title)
  }

  goBack(): void {
    this.location.back();
  }

}
