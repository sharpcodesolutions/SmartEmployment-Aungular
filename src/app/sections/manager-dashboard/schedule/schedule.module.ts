import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogAnimationsExampleDialog, ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { AppModule } from 'src/app/app.module';
// import { NgbdSortableHeader } from 'src/app/shared/utils/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from './schedule.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    DialogAnimationsExampleDialog
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    FormsModule, 
    FontAwesomeModule, 
    MatDialogModule
  ], 
  providers: [
    ScheduleService, 
    DatePipe
  ]
})
export class ScheduleModule { }
