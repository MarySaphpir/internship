import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HeroFormComponent } from './hero-form/hero-form.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TodoReactiveFormComponent} from './todo-reactive-form/todo-reactive-form.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
  {path: 'todo', component: HeroFormComponent, pathMatch: 'full'},
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'todo-reactive', component: TodoReactiveFormComponent, pathMatch: 'full'}
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
