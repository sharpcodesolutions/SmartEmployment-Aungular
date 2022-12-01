import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { AppModule } from 'src/app/app.module';
import { NgbdSortableHeader } from 'src/app/shared/utils/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    NgbdSortableHeader
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    FormsModule
  ]
})
export class ScheduleModule { }