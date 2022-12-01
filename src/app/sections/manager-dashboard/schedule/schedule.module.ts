import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes)
  ]
})
export class ScheduleModule { }
