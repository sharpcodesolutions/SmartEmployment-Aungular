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

  getScheduleForEmployee(employeeId:number, date:Date) : ISchedule {
    let schedule = this.schedules.find(s => s.employeeId == employeeId && this.datePipe.transform(s.date, 'shortDate') == this.datePipe.transform(date, 'shortDate'))!;
    // if(schedule)
    // {
    //   let startTime = new Date(schedule.startTime.toString()); 
    //   schedule.startTime = new Date(this.datePipe.transform(startTime, 'HH:mm')!);
    // }
    return schedule; 
    // schedule.startTime = this.datePipe.transform(schedule.startTime.toString().replace(' ', 'T'), 'HH:mm')!; // formatDate(`${schedule.startTime}`.replaceFunction('/','-'),'full','es-CO');
  }

  currentWeekDays() {
    // If no date object supplied, use current date
    // Copy date so don't modify supplied date
    let days:Date[] = [];
    var now = new Date();
  
    // set time to some convenient value
    now.setHours(0,0,0,0);
  
    // Get the previous Monday
    let monday = new Date(now);
    monday.setDate(monday.getDate() - monday.getDay() + 1);
    days[0] = monday; 
    
    let tuesday = new Date(now);
    tuesday.setDate(tuesday.getDate() - tuesday.getDay() + 2);
    days[1] = tuesday;
    
    let wednesday = new Date(now);
    wednesday.setDate(wednesday.getDate() - wednesday.getDay() + 3);
    days[2] = wednesday;

    let thursday = new Date(now);
    thursday.setDate(thursday.getDate() - thursday.getDay() + 4);
    days[3] = thursday;

    let friday = new Date(now);
    friday.setDate(friday.getDate() - friday.getDay() + 5);
    days[4] = friday;

    let saturday = new Date(now);
    saturday.setDate(saturday.getDate() - saturday.getDay() + 6);
    days[5] = saturday;

    let sunday = new Date(now);
    sunday.setDate(sunday.getDate() - sunday.getDay() + 7);
    days[6] = sunday;
   
    // Return array of date objects
    return days;
  }

  addDays(date: Date, days: number): Date {
    const day = date; 
    day.setDate(date.getDate() + days);
    return day;
  }
}
