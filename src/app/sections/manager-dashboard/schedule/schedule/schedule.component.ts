import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { IEmployee } from 'src/app/sections/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  employees$: Observable<IEmployee[]> = of([]);
  total$: Observable<number> = of(0);
  schedules$: Observable<ISchedule[]> = of([]);
  schedules: ISchedule[] = [];

  constructor(private authService:AuthService, public employeeService:EmployeeService, public scheduleService:ScheduleService, public datePipe:DatePipe)
  {

  }

  ngOnInit(): void {
    console.log('from the schedule list');
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });

    this.employees$ = this.employeeService.employees$;
    this.total$ = this.employeeService.total$; 

    this.schedules$ = this.scheduleService.schedules$;
    this.scheduleService.schedules$.subscribe(schedules => this.schedules = schedules); 
    this.schedules$.forEach(s => console.log(s));
    console.log('the schedules are: ' + this.schedules$);
  }

  getScheduleForEmployee(employeeId:number) : ISchedule {
    let schedule = this.schedules.find(s => s.employeeId == employeeId)!;
    // if(schedule)
    // {
    //   let startTime = new Date(schedule.startTime.toString()); 
    //   schedule.startTime = new Date(this.datePipe.transform(startTime, 'HH:mm')!);
    // }
    return schedule; 
    // schedule.startTime = this.datePipe.transform(schedule.startTime.toString().replace(' ', 'T'), 'HH:mm')!; // formatDate(`${schedule.startTime}`.replaceFunction('/','-'),'full','es-CO');
  }
}
