import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ISchedule } from './schedule.model';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class ScheduleService {

  	constructor(private authService: AuthService, private http: HttpClient, private datePipe:DatePipe) { 
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
		return this.http.put<number>('https://localhost:7197/api/Employees/Schedules/' + schedule.id + '/' 
			+ this.datePipe.transform(schedule.startTime, 'shortTime') + '/' + this.datePipe.transform(schedule.endTime, 'shortTime'), schedule, httpOptions);
	}
}
