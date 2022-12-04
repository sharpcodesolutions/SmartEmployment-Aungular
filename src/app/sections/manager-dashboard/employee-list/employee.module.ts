import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

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
    MatButtonModule
  ], 
  exports: [
    MatToolbarModule, 
    MatGridListModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule
  ], 
})
export class EmployeeModule { }
