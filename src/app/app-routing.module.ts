import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskFormListComponent } from './task-form-list/task-form-list.component';
import { ChartComponent } from './chart/chart.component';
import { TaskFormComponent } from './task-form/task-form.component'

const routes: Routes = [
  { path: '', redirectTo: '/app-task-form', pathMatch: 'full' },
  { path: 'app-task-form', component: TaskFormComponent },
  { path: 'task-form-list', component: TaskFormListComponent },
  { path: 'app-chart', component: ChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
