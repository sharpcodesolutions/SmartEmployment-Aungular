import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Routes, RouterModule, RoutesRecognized } from '@angular/router';
import { AppModule } from 'src/app/app.module';
// import { NgbdSortableHeader } from 'src/app/shared/utils/sortable.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from './schedule.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAnimationsAddEdit, DialogAnimationsExampleDialog, ScheduleComponent } from './schedule/schedule.component';

const routes: Routes = [
  { path: 'schedule', component: ScheduleComponent }
];

@NgModule({
  declarations: [
    ScheduleComponent,
    DialogAnimationsExampleDialog,
    DialogAnimationsAddEdit
  ],
  imports: [
    CommonModule, 
    RouterModule.forChild(routes), 
    NgbModule, 
    FormsModule, 
    FontAwesomeModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    NgxMaterialTimepickerModule, 
    ReactiveFormsModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule
  ], 
  exports: [
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule
  ],
  providers: [
    ScheduleService, 
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ScheduleModule { }
