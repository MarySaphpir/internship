import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms'

import {AppComponent} from './app.component';
import {HeroFormComponent} from './hero-form/hero-form.component';
import {TodoListComponent} from './todo-list/todo-list.component';
import {TodoItemComponent} from './todo-item/todo-item.component'
import {TodoService} from './services/todo.service';
import {FilterTodoPipe} from './todo-list/filter.todo.pipe';
import {ShowTipsDirective} from './show-tips.directive';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {TodoReactiveFormComponent} from './todo-reactive-form/todo-reactive-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroFormComponent,
    TodoListComponent,
    TodoItemComponent,
    FilterTodoPipe,
    ShowTipsDirective,
    DashboardComponent,
    TodoReactiveFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
