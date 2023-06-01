import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

// Import components specific to the manager dashboard
import { EmployeeComponent } from './employees-list/employee/employee.component';
import { EmployeeListComponent } from './employees-list/employee-list.component';
import { ManagerComponent } from './manager.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { DialogAnimationsExampleDialog } from './shedules-list/schedule.component';
import { DialogAnimationsAddEdit } from './shedules-list/schedule.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScheduleComponent } from './shedules-list/schedule.component';


@NgModule({
  declarations: [
    // Declare the components specific to the manager dashboard
    EmployeeComponent,
    EmployeeListComponent,
    ScheduleComponent,
    ManagerComponent, 
    DialogAnimationsExampleDialog, 
    DialogAnimationsAddEdit
  ],
  imports: [
    CommonModule, 
    DragDropModule,
    MatToolbarModule, 
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule,
    MatButtonModule, MatSnackBarModule, MatTableModule, MatIconModule, MatPaginatorModule, MatSortModule, FormsModule, 
    MatDialogModule,
    BrowserAnimationsModule, 
    BrowserModule, 
    FontAwesomeModule,
    NgbPaginationModule,
    NgxMaterialTimepickerModule,
    RouterModule.forChild([
      // Define the routes for the manager dashboard components
      {
        path: '',
        component: ManagerComponent,
        children: [
          { path: 'employees', component: EmployeeListComponent },
          { path: 'schedules', component: ScheduleComponent }
        ]
      }
    ])
  ], 
  exports: [
    MatToolbarModule, 
    ReactiveFormsModule,
    MatGridListModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule, 
    MatSnackBarModule, 
    MatTableModule, 
    MatIconModule, 
    MatPaginatorModule,
    MatSortModule, 
    MatDialogModule
  ], 
  providers: [
    DatePipe
  ]
})
export class ManagerModule { }
