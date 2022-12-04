import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service: EmployeeService) {

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
}
