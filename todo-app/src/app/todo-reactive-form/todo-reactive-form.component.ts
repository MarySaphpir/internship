import {Component, Input, OnChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {marks, Todo, Comment} from '../services/data-model';

@Component({
  selector: 'todo-reactive-form',
  templateUrl: './todo-reactive-form.component.html',
  styleUrls: ['./todo-reactive-form.component.css']
})
export class TodoReactiveFormComponent {
  todoForm: FormGroup;
  marks = marks;
  @Input() todoList: Todo;

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnChanges() {
    this.todoForm.reset({
      todoName: ['', Validators.required],
      description: this.formBuilder.group({
        completed: false,
        comment: '',
        mark: ''
      }),
    });
  }

  submit(data) {
    console.log(data);
  }

  get secretTasks(): FormArray {
    return this.todoForm.get('secretTasks') as FormArray;
  }

  createForm() {
    this.todoForm = this.formBuilder.group({
      todoName: ['', Validators.required],
      description: this.formBuilder.group({
        completed: false,
        comment: '',
        mark: ''
      }),
      secretTask: this.formBuilder.array([])
    });
  }

  setComment(comments: Comment[]) {
    const commentsFG = comments.map(comment => this.formBuilder.group(comment));
    const commentsArray = this.formBuilder.array(commentsFG);
    this.todoForm.setControl('secretTasks', commentsArray);
    console.log(this.todoForm.get('secretTasks'));
  }

  addSecretTask() {
    this.secretTasks.push(this.formBuilder.group(new Comment()));
  }

}
