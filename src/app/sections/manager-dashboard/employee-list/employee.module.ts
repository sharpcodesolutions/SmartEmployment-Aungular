import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
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
    FormsModule, 
    MatDialogModule
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
  ]
})
export class EmployeeModule { }
