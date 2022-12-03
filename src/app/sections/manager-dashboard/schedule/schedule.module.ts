import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DialogAnimationsEdit, DialogAnimationsExampleDialog, ScheduleComponent } from './schedule/schedule.component';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { AppModule } from 'src/app/app.module';
// import { NgbdSortableHeader } from 'src/app/shared/utils/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ScheduleService } from './schedule.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    DialogAnimationsExampleDialog, 
    DialogAnimationsEdit
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    FormsModule, 
    FontAwesomeModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule
  ], 
  providers: [
    ScheduleService, 
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleModule { }
