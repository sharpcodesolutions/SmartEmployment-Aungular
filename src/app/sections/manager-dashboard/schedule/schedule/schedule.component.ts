import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IEmployee } from 'src/app/sections/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  employees$: Observable<IEmployee[]> = of([]);
  total$: Observable<number> = of(0);

  constructor(private authService:AuthService, public employeeService:EmployeeService)
  {

  }

  ngOnInit(): void {
    console.log('from the employee list');
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });

    this.employees$ = this.employeeService.employees$;
    this.total$ = this.employeeService.total$; 
  }
}
