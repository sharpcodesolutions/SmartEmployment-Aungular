import { Component, Input, OnInit } from '@angular/core';
import { IEmployee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.sass']
})
export class EmployeeCardComponent implements OnInit {
  
  @Input()
  employee?:IEmployee;

  constructor() { }

  ngOnInit(): void {
  }

}
