import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Observable, map, of, BehaviorSubject } from 'rxjs';
import { IEmployee } from 'src/app/core/models/employee.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { IAllSchedules, ISchedule } from 'src/app/core/models/schedule.model';
import { ScheduleService } from '../services/schedule.service';
import { faPencil, faTimes, faPlus, faArrows } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotifictionService } from '../services/notifiction.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { forkJoin } from 'rxjs';
import {parse, stringify, toJSON, fromJSON} from 'flatted';
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
  _employees: BehaviorSubject<IEmployee[]> = new BehaviorSubject<IEmployee[]>([]);

  //employees: IEmployee[] = [];
  employees$: Observable<IEmployee[]> = of([]);
  total$: Observable<number> = of(0);
  //schedules$: Observable<ISchedule[]> = of([]);
  schedules: ISchedule[] = [];
  AllSchedules: IAllSchedules[] = [];
  allSchedules$: Observable<IAllSchedules[]> = of([]);
  startDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  endDate$: BehaviorSubject<Date> = new BehaviorSubject<Date>(new Date());
  startDate: Date = new Date(); 
  endDate: Date = new Date(); 
  faTimes = faTimes; 
  faPencil = faPencil;
  faArrows = faArrows; 
  faPlus = faPlus;
  daysOfTheWeek: Date[] = this.currentWeekDays(); 
  isDragEntered: Boolean = false; 
  loaded: boolean = false;

  constructor(private cdr: ChangeDetectorRef, private authService:AuthService, public employeeService:EmployeeService, 
    public scheduleService:ScheduleService, public datePipe:DatePipe, public dialog: MatDialog)
  {
  }

  ngOnInit(): void {
    this.initialiseData();   
  }

  initialiseData() {
    this.loaded = false; 
    let endDateLoaded = false; 
    let startDateLoaded = false; 
    let scheduleLoaded = false; 
    this.employees$ = this.employeeService.employees$;
    this.total$ = this.employeeService.total$; 
    this.startDate$.next(this.currentWeekDays()[0]);
    this.endDate$.next(this.currentWeekDays()[6]); 
    
    this.startDate$.subscribe(date => {
      this.startDate = date;
      startDateLoaded = true; 
      this.loaded = endDateLoaded && startDateLoaded && scheduleLoaded; 
    }); 

    this.endDate$.subscribe(date => {
      this.endDate = date;
      endDateLoaded = true; 
      this.loaded = endDateLoaded && startDateLoaded && scheduleLoaded;
    }); 

    this.employeeService.GetEmployees().subscribe(employees => {
      this._employees.next(employees);
      this.allSchedules$ = this.scheduleService.GetAllSchedules(employees, this.startDate, this.endDate); 
      this.scheduleService.GetAllSchedules(employees, this.startDate, this.endDate).subscribe(allSchedules => {
        this.AllSchedules = allSchedules; 
        scheduleLoaded = true;
        this.loaded = endDateLoaded && startDateLoaded && scheduleLoaded;
      });
    });  
  }

  getScheduleForEmployee(employeeId:number, i:number) : IAllSchedules {
    let allSchedule = this.AllSchedules.find(s => s.employeeId === employeeId && s.dayIndex === i)!;
    return allSchedule; 
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

  // addDays(date: Date, days: number): Date {
  //   const day = date; 
  //   day.setDate(date.getDate() + days);
  //   return day;
  // }

  DeleteSchedule(id:number)
  {
    this.scheduleService.DeleteSchedule(id).subscribe(schedules =>{
      this.initialiseData(); 
    });
  }

  AddSchedule(schedule:ISchedule)
  {
    this.scheduleService.AddSchedule(schedule).subscribe(() =>{
      this.initialiseData(); 
    });
  }

  dragEntered() {
    this.isDragEntered = true;
  }

  dragExited() {
    this.isDragEntered = false; 
  }

  drop(event: CdkDragDrop<any>) {
    this.isDragEntered = false;
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if(!event.container.data.active) {
        let singleSchedule:ISchedule = {
          id:0,
          date:this.currentWeekDays()[event.container.data.dayIndex],
          dayIndex:event.container.data.dayIndex, 
          startTime:event.previousContainer.data.startTime, 
          endTime:event.previousContainer.data.endTime, 
          hours:event.previousContainer.data.hours, 
          comments:event.previousContainer.data.comments, 
          employeeId:event.container.data.employeeId, 
          taskId:event.previousContainer.data.taskId,
        }
        this.AddSchedule(singleSchedule); //.subscribe(s => console.log(s)); 
      }
    }
  }  

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeName: string, schedule: IAllSchedules): void {
    const dialogRef = this.dialog.open(DialogAnimationsConfirm, {
      width: '250px',
      data: {employeeName: employeeName, schedule: schedule},
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      if(result)
      {
        this.DeleteSchedule(result.id)
      }
    });
  }

  openEditDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeName: string, schedule: IAllSchedules): void {
    this.scheduleService.populateForm(schedule); 

    this.dialog.open(DialogAnimationsAddEdit, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    }).afterClosed().subscribe(result => {
      this.initialiseData();
    });
  }

  openAddDialog(enterAnimationDuration: string, exitAnimationDuration: string, employeeId: number, employeeName: string, dayIndex: number, date: Date): void {
    this.scheduleService.initialiseFormGroup(date, dayIndex, employeeId); 

    this.dialog.open(DialogAnimationsAddEdit, {
      width: '300px',
      disableClose: true, 
      enterAnimationDuration,
      exitAnimationDuration
    }).afterClosed().subscribe(result => {
      this.initialiseData();
    });
  }
}

export interface IDialogData {
  employeeName: string;
  schedule: ISchedule;
}

@Component({
  selector: 'dialog-animations-confirm',
  templateUrl: './dialog-animations-confirm.html',
})
export class DialogAnimationsConfirm {

  constructor(public dialogRef: MatDialogRef<DialogAnimationsAddEdit>, @Inject(MAT_DIALOG_DATA) public data: IDialogData) {
    dialogRef.disableClose = true;
  }

  onClose() {
    this.dialogRef.close();
  }

  onOk() {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-animations-add-edit',
  templateUrl: './dialog-animations-add-edit.html',
  styleUrls: ['./schedule.component.css']
})
export class DialogAnimationsAddEdit implements OnInit {
  isSaving: boolean = false; 
  constructor(private notificationService:NotifictionService, public scheduleService:ScheduleService, 
    public dialogRef: MatDialogRef<DialogAnimationsAddEdit>) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if(this.scheduleService.form.valid) {
      this.isSaving = true; 
      if(this.scheduleService.form.get('id')?.value === 0)
      {
        const schedule:ISchedule = this.scheduleService.form.value;   
        schedule.startTime = moment.utc(schedule.startTime, ["h:mm A"]).toDate();
        schedule.endTime = moment.utc(schedule.endTime, ["h:mm A"]).toDate();
        this.scheduleService.AddSchedule(schedule).subscribe(s => {
          this.scheduleService.form.reset();
          this.notificationService.success('Schedule created successfully');
          this.isSaving = false;
          this.onClose(); 
        });
      }
      else 
      {
        const schedule:ISchedule = this.scheduleService.form.value;
        schedule.startTime = moment.utc(schedule.startTime, ["h:mm A"]).toDate(); 
        schedule.endTime = moment.utc(schedule.endTime, ["h:mm A"]).toDate();
        this.scheduleService.UpdateSchedule(schedule).subscribe(s => {
          this.scheduleService.form.reset();
          this.notificationService.success('Schedule updated successfully');
          this.isSaving = false;
          this.onClose(); 
        });
      }
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