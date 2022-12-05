import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/sections/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';
import { NotifictionService } from '../../services/notifiction.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService, private notificationService: NotifictionService, public dialogRef: MatDialogRef<EmployeeComponent>) {

  }

  ngOnInit(): void {
    
  }

  get employeeService() {
    return this.service;
  }

  onClear() {
    this.service.form.reset(); 
    this.service.initialiseFormGroup(); 
  }

  onSubmit() {
    console.log('the value is: ' + this.employeeService.form.value.firstname);
    if(this.employeeService.form.valid) {
      if(!this.employeeService.form.get('id')?.value)
      {
        this.employeeService.AddEmployee(this.employeeService.form.value).subscribe(employee => console.log('employee created successfully'));
      }
      else 
      {
        this.employeeService.UpdateEmployee(this.employeeService.form.value).subscribe(employee => console.log('employee updated successfully'));
      }

      console.log('the form is valid');
      
      this.employeeService.form.reset();
      this.employeeService.initialiseFormGroup();
      this.notificationService.success('Employee created successfully');
      this.onClose(); 
    }
  }

  onClose() {
    this.employeeService.form.reset(); 
    this.employeeService.initialiseFormGroup(); 
    this.dialogRef.close(); 
  }
}
