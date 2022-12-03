import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable, map, of, BehaviorSubject } from 'rxjs';
import { IEmployee } from 'src/app/sections/models/employee.model';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../schedule.service';
import { faPencil, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

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
  startDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  endDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  startDate: Date = new Date(); 
  endDate: Date = new Date(); 
  faTimes = faTimes; 
  faPencil = faPencil;
  faPlus = faPlus;

  constructor(private authService:AuthService, public employeeService:EmployeeService, 
    public scheduleService:ScheduleService, public datePipe:DatePipe, public dialog: MatDialog)
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
    this.startDate$.next(this.currentWeekDays()[0]);
    this.endDate$.next(this.currentWeekDays()[6]); 
    this.startDate$.subscribe(date => this.startDate = date); 
    this.endDate$.subscribe(date => this.endDate = date); 
    this.schedules$ = this.scheduleService.GetSchedules(this.startDate, this.endDate);

    this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules => {
      this.schedules = schedules; 
    });
    // this.schedules$.forEach(s => console.log(s));
    console.log('the schedules are: ' + this.schedules$);
  }

  getScheduleForEmployee(employeeId:number, i:number) : ISchedule {
    let schedule = this.schedules.find(s => s.employeeId === employeeId && s.dayIndex === i)!;
    return schedule; 
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

  DeleteSchedule(id:number)
  {
    console.log('delete clicked');
    this.scheduleService.DeleteSchedule(id).subscribe(() =>{
      // this.schedules$ = this.scheduleService.GetSchedules(this.startDate, this.endDate);
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
        this.schedules = schedules;
      });
    });
  }

  UpdateSchedule(schedule:ISchedule)
  {
    console.log('update clicked');
    this.scheduleService.UpdateSchedule(schedule).subscribe(() =>{
      // this.schedules$ = this.scheduleService.GetSchedules(this.startDate, this.endDate);
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
        this.schedules = schedules;
      });
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeName: string, schedule: ISchedule): void {
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, {
      width: '250px',
      data: {employeeName: employeeName, schedule: schedule},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        console.log('The dialog was closed' + result);
        this.DeleteSchedule(result.id);
      }
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeName: string, schedule: ISchedule): void {
    const dialogRef = this.dialog.open(DialogAnimationsEdit, {
      width: '300px',
      data: {employeeName: employeeName, schedule: schedule, startTime: schedule.startTime.toString(), endTime: schedule.endTime.toString()},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('ok or no? ' + ' ' + result.isOk);
      if(result)
      {
        console.log('The eidt dialog was closed' + result.startTime + ' ' + result.endTime);
        result.schedule.startTime = new Date(result.startTime); 
        result.schedule.endTime = new Date(result.endTime); 
        this.UpdateSchedule(result.schedule);
      }
      else 
      {
        this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
          this.schedules = schedules;
        });
      }
    });
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeId: number, employeeName: string, dayIndex: number): void {
    let newSchedule: ISchedule = {id: 0, employeeId: employeeId, date: new Date, dayIndex: dayIndex, 
      startTime: new Date(), endTime: new Date(), hours: 0, comments: '', taskId: 0};
    const dialogRef = this.dialog.open(DialogAnimationsEdit, {
      width: '300px',
      data: {employeeId: employeeId, employeeName: employeeName, schedule: newSchedule, startTime: '', endTime: ''},
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        console.log('The eidt dialog was closed' + result.startTime + ' ' + result.endTime);
        result.schedule.startTime = new Date(result.startTime); 
        result.schedule.endTime = new Date(result.endTime); 
        this.UpdateSchedule(result.schedule);
      }
      else 
      {
        this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
          this.schedules = schedules;
        });
      }
    });
  }
}

export interface IDialogData {
  employeeName: string;
  schedule: ISchedule;
}

export interface IDialogEditData {
  employeeName: string;
  schedule: ISchedule;
  startTime: string; 
  endTime: string;
  isOk: boolean;
}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: './dialog-animations-example-dialog.html',
})
export class DialogAnimationsExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>, @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
    dialogRef.disableClose = true;
  }

  onClose() {
    console.log('close clicked');
    this.dialogRef.close();
  }

  onOk() {
    console.log('ok clicked');
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-animations-eidt',
  templateUrl: './dialog-animations-edit.html',
})
export class DialogAnimationsEdit implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsEdit>, @Inject(MAT_DIALOG_DATA) public data: IDialogEditData) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    // this.data.startTime = this.data.schedule.startTime.toString(); 
    // this.data.endTime = this.data.schedule.endTime.toString(); 
  }

  onClose() {
    console.log('close clicked');
    this.data.isOk = false; 
    this.dialogRef.close();
  }

  onOk() {
    console.log('ok clicked');
    this.data.isOk = true; 
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-animations-add',
  templateUrl: './dialog-animations-add.html',
})
export class DialogAnimationsAdd implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsAdd>, @Inject(MAT_DIALOG_DATA) public data: IDialogEditData) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    // this.data.startTime = this.data.schedule.startTime.toString(); 
    // this.data.endTime = this.data.schedule.endTime.toString(); 
  }

  onClose() {
    console.log('close clicked');
    this.data.isOk = false; 
    this.dialogRef.close();
  }

  onOk() {
    console.log('ok clicked');
    this.data.isOk = true; 
    this.dialogRef.close();
  }
}