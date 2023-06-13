import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { IAllSchedules, ISchedule } from '../../core/models/schedule.model';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment'
import { IEmployee } from 'src/app/core/models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  	constructor(private authService: AuthService, private http: HttpClient, private datePipe:DatePipe) { 
  	}

	form: FormGroup = new FormGroup({ 
		id: new FormControl(0), 
		startTime: new FormControl('', Validators.required), 
		endTime: new FormControl('', Validators.required),
		comments: new FormControl(''), 
		date: new FormControl(''),
		dayIndex: new FormControl(0),
		hours: new FormControl(0), 
		employeeId: new FormControl(0), 
		taskId: new FormControl(0)
	});	

	initialiseFormGroup(date:Date, dayIndex:number, employeeId:number) {
		this.form.setValue({
			id: 0, 
			startTime: '', 
			endTime: '', 
			comments: '', 
			date: date,
			dayIndex: dayIndex,
			hours: 0, 
			employeeId: employeeId, 
			taskId: 0
		});
	}

	GetSchedules(startDate:Date, endDate:Date):Observable<ISchedule[]>{
		return this.http.get<ISchedule[]>('https://localhost:7197/api/Employees/schedules/' +
			this.authService.getCurrUser().username + '/' + 
			this.datePipe.transform(startDate, "dd%2FMM%2Fyyyy") + '/' + this.datePipe.transform(endDate, "dd%2FMM%2Fyyyy"));
	}

	DeleteSchedule(id:number):Observable<number> {
		return this.http.delete<number>('https://localhost:7197/api/Employees/Schedules/' + id);
	} 

	UpdateSchedule(schedule:ISchedule):Observable<number> {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			})
		};
		return this.http.put<number>('https://localhost:7197/api/Employees/Schedules', schedule, httpOptions);
	}

	AddSchedule(schedule: ISchedule): Observable<ISchedule> {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			})
		};
		return this.http.post<ISchedule>('https://localhost:7197/api/Employees/Schedules', schedule, httpOptions);
	}

	populateForm(schedule:ISchedule){
		schedule.startTime = new Date(schedule.startTime);
		schedule.endTime = new Date(schedule.endTime);
		let start = this.datePipe.transform(schedule.startTime, 'shortTime'); 
		let end = this.datePipe.transform(schedule.endTime, 'shortTime'); 
		// schedule.startTime = start; 
		const momentDate = moment(start?.toString(), ["h:mm A"]).toDate();
		schedule.startTime = momentDate;
		// schedule.endTime = momentDate;
		// this.form.patchValue({ time: momentDate });
		this.form.patchValue(schedule); 
		this.form.patchValue({startTime: start});
		this.form.patchValue({endTime: end}); 

		// this.form.patchValue({endTime: schedule.endTime.toString()})
	}

	getScheduleForEmployee(employeeId:number, i:number, schedules:ISchedule[]) : ISchedule {
		let schedule = schedules.find(s => s.employeeId === employeeId && s.dayIndex === i)!;
		return schedule; 
	  }

	SchedulesToAllSchedules(schedules:ISchedule[], employees:IEmployee[]) : IAllSchedules[] {
		console.log('from inside schedulesToAllSchedules, employee length is: ' + employees.length + ' and schedules length is: '
			+ schedules.length);
		let total = employees.length; 
		let allSchedules:IAllSchedules[] = [];
		for(var i=0; i<total; i++) {
			for(var day=0; day<7; day++)
			{
				let schedule = this.getScheduleForEmployee(employees[i].id, day, schedules);
				if(schedule) {
					let singleAllSchedule:IAllSchedules = {
						id:i,
						date:schedule.date,
						dayIndex:schedule.dayIndex, 
						startTime:schedule.startTime, 
						endTime:schedule.endTime, 
						hours:schedule.hours, 
						comments:schedule.comments, 
						employeeId:schedule.employeeId, 
						taskId:schedule.taskId,
						active:true 
					}
					allSchedules.push(singleAllSchedule); 		
				}
				else {
					let singleAllSchedule:IAllSchedules = {
						id:i,						
						employeeId:employees[i].id, 
						active:false 
					}
					allSchedules.push(singleAllSchedule); 
				}
			}	
		}

		return allSchedules; 
	}
}
