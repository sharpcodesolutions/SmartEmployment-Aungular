import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { Observable, map, of, BehaviorSubject } from 'rxjs';
import { IEmployee } from 'src/app/core/models/employee.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { IAllSchedules, ISchedule } from 'src/app/core/models/schedule.model';
import { ScheduleService } from '../services/schedule.service';
import { faPencil, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifictionService } from '../services/notifiction.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';
import {
  CdkDrag,
  CdkDragPlaceholder,
  CdkDropList, 
  transferArrayItem
} from '@angular/cdk/drag-drop';
import {NgFor} from '@angular/common';

import * as moment from 'moment';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  employees$: Observable<IEmployee[]> = of([]);
  employees: IEmployee[] = [];
  total$: Observable<number> = of(0);
  //schedules$: Observable<ISchedule[]> = of([]);
  schedules: ISchedule[] = [];
  AllSchedules: IAllSchedules[] = [];
  startDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  endDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  startDate: Date = new Date(); 
  endDate: Date = new Date(); 
  faTimes = faTimes; 
  faPencil = faPencil;
  faPlus = faPlus;
  daysOfTheWeek: Date[] = this.currentWeekDays(); 
  isDragEntered: Boolean = false; 

  constructor(private authService:AuthService, public employeeService:EmployeeService, 
    public scheduleService:ScheduleService, public datePipe:DatePipe, public dialog: MatDialog)
  {

  }

  ngOnInit(): void {
    console.log('from the schedule list');
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.authService.authChanged.subscribe(res => {
      this.isUserAuthenticated = res;
    });
    this.employeeService.GetEmployees().subscribe(employees => {
      this.employees = employees; 
    });

    this.employees$ = this.employeeService.employees$;
    this.total$ = this.employeeService.total$; 
    this.startDate$.next(this.currentWeekDays()[0]);
    this.endDate$.next(this.currentWeekDays()[6]); 
    this.startDate$.subscribe(date => this.startDate = date); 
    this.endDate$.subscribe(date => this.endDate = date); 
    //this.schedules$ = this.scheduleService.GetSchedules(this.startDate, this.endDate);

    // this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules => {
    //   this.schedules = schedules; 
    //   this.AllSchedules = this.scheduleService.SchedulesToAllSchedules(schedules, this.employees);
    // });
    const _employees$ = this.employeeService.GetEmployees();
    const _schedules$ = this.scheduleService.GetSchedules(this.startDate, this.endDate);

    // Use forkJoin to wait for both requests to complete
    forkJoin([_employees$, _schedules$]).subscribe(([employees, schedules]) => {
      // Both requests have completed, so you can assign the values and call SchedulesToAllSchedules
      this.employees = employees;
      this.schedules = schedules;

      this.AllSchedules = this.scheduleService.SchedulesToAllSchedules(this.schedules, this.employees);
    });
    // this.schedules$.forEach(s => console.log(s));
    //console.log('the schedules are: ' + this.schedules$);
  }

  getScheduleForEmployee(employeeId:number, i:number) : ISchedule {
    let schedule = this.schedules.find(s => s.employeeId === employeeId && s.dayIndex === i)!;
    return schedule; 
  }

  getAllScheduleForEmployee(employeeId:number) : IAllSchedules[] {
    let allSchedule = this.AllSchedules.filter(s => s.employeeId === employeeId);
    return allSchedule; 
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
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
        this.schedules = schedules;
      });
    });
  }

  UpdateSchedule(schedule:ISchedule)
  {
    console.log('update clicked');
    this.scheduleService.UpdateSchedule(schedule).subscribe(() =>{
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
        this.schedules = schedules;
      });
    });
  }

  AddSchedule(schedule:ISchedule)
  {
    console.log('add clicked');
    this.scheduleService.AddSchedule(schedule).subscribe(() =>{
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules =>{
        this.schedules = schedules;
      });
    });
  }

  dragEntered() {
    this.isDragEntered = true;
    console.log('drag entered'); 
  }

  dragExited() {
    this.isDragEntered = false; 
    console.log('drag exited');
  }

  onDragStarted() {
    // Code to execute when dragging starts
  }
  
  onDragEnded() {
    // Code to execute when dragging ends
  }

  // drop(event: CdkDragDrop<IAllSchedules[]>) {
  //   moveItemInArray(this.daysOfTheWeek, event.previousIndex, event.currentIndex);
  //   this.isDragEntered = false; 
  //   console.log('drag released' + event.previousIndex + ' ' + event.currentIndex);
  // }

  drop(event: CdkDragDrop<IAllSchedules[]>) {
    this.isDragEntered = false;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      let newSchedule = event.container.data; 
      console.log('event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex,'
        + ' ' + event.previousContainer.data + ' ' + event.container.data + ' ' + event.previousIndex + ' ' + event.currentIndex);
    }
  }
  
  onDragReleased(event: CdkDragDrop<any, any, any>) {
    // if (event.previousContainer !== event.container) {
    //   // Code to execute when an element is dropped into a different container
    //   moveItemInArray(
    //     this.daysOfTheWeek, 
    //     event.previousIndex, 
    //     event.currentIndex);
    // } else {
    //   // Code to execute when an element is dropped within the same container
    //   moveItemInArray(
    //     this.daysOfTheWeek,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }
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
    this.scheduleService.populateForm(schedule); 

    const dialogRef = this.dialog.open(DialogAnimationsAddEdit, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules => {
        this.schedules = schedules; 
      });
    });
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeId: number, employeeName: string, dayIndex: number, date: Date): void {
    this.scheduleService.initialiseFormGroup(date, dayIndex, employeeId); 

    const dialogRef = this.dialog.open(DialogAnimationsAddEdit, {
      width: '300px',
      disableClose: true, 
      enterAnimationDuration,
      exitAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      this.scheduleService.GetSchedules(this.startDate, this.endDate).subscribe(schedules => {
        this.schedules = schedules; 
      });
    });
  }
}

export interface IDialogData {
  employeeName: string;
  schedule: ISchedule;
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
  selector: 'dialog-animations-add',
  templateUrl: './dialog-animations-add.html',
  styleUrls: ['./schedule.component.css']
})
export class DialogAnimationsAddEdit implements OnInit {

  constructor(private notificationService:NotifictionService, public scheduleService:ScheduleService, 
    public dialogRef: MatDialogRef<DialogAnimationsAddEdit>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    // this.data.startTime = this.data.schedule.startTime.toString(); 
    // this.data.endTime = this.data.schedule.endTime.toString(); 
  }

  onSubmit() {
    console.log('the value is: ' + this.scheduleService.form.value.startTime);
    if(this.scheduleService.form.valid) {
      if(this.scheduleService.form.get('id')?.value === 0)
      {
        const schedule:ISchedule = this.scheduleService.form.value;   
        schedule.startTime = moment.utc(schedule.startTime, ["h:mm A"]).toDate();
        schedule.endTime = moment.utc(schedule.endTime, ["h:mm A"]).toDate();
        this.scheduleService.AddSchedule(schedule).subscribe(s => console.log('schedule created successfully'));
      }
      else 
      {
        const schedule:ISchedule = this.scheduleService.form.value;
        schedule.startTime = moment.utc(schedule.startTime, ["h:mm A"]).toDate(); 
        schedule.endTime = moment.utc(schedule.endTime, ["h:mm A"]).toDate();
        this.scheduleService.UpdateSchedule(schedule).subscribe(s => console.log('schedule updated successfully'));
      }

      console.log('the form is valid');
      
      this.scheduleService.form.reset();
      // this.scheduleService.initialiseFormGroup();
      this.notificationService.success('Schedule created successfully');
      this.onClose(); 
    }
  }

  onClear() {
    this.scheduleService.form.reset(); 
    // this.scheduleService.initialiseFormGroup(); 
  }

  onClose() {
    this.scheduleService.form.reset(); 
    // this.scheduleService.initialiseFormGroup(); 
    this.dialogRef.close(); 
  }
}