import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IEmployee } from '../sections/models/employee.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../shared/utils/sortable.directive';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmployeeService {	

	constructor(private authService: AuthService, private http: HttpClient, private pipe: DecimalPipe) {
		
	}

	form: FormGroup = new FormGroup({ 
		$key: new FormControl(null), 
		employeeCode: new FormControl('', Validators.required), 
		companyCode: new FormControl('', Validators.required),
		firstname: new FormControl('', Validators.required),
		lastname: new FormControl('', Validators.required),
		employeeEmail: new FormControl('', Validators.email),
		birthdate: new FormControl('', Validators.required),
		startdate: new FormControl('', Validators.required),
		terminationDate: new FormControl('')
	});	

	initialiseFormGroup() {
		this.form.setValue({
			$key: null, 
			employeeCode: '', 
			companyCode: '',
			firstname: '',
			lastname: '',
			employeeEmail: '',
			birthdate: '',
			startdate: '',
			terminationDate: ''
		})
	}

	GetEmployees():Observable<IEmployee[]>{
		return this.http.get<IEmployee[]>('https://localhost:7197/api/Employees/' +
			this.authService.getCurrUser().username);
	}

	// `DeleteSchedule(id:number):Observable<number> {
	// 	return this.http.delete<number>('https://localhost:7197/api/Employees/Schedules/' + id);
	// } 

	// UpdateSchedule(schedule:ISchedule):Observable<number> {
	// 	const httpOptions = {
	// 		headers: new HttpHeaders({
	// 		  'Content-Type':  'application/json',
	// 		})
	// 	};
	// 	return this.http.put<number>('https://localhost:7197/api/Employees/Schedules/' + schedule.id + '/' 
	// 		+ this.datePipe.transform(schedule.startTime, 'shortTime') + '/' + this.datePipe.transform(schedule.endTime, 'shortTime'), schedule, httpOptions);
	// }`

	AddEmployee(employeeSM: IEmployee): Observable<IEmployee> {
		const httpOptions = {
			headers: new HttpHeaders({
			  'Content-Type':  'application/json',
			})
		};
		console.log('the user is: ' + this.authService.getCurrUser().username);
		return this.http.post<IEmployee>('https://localhost:7197/api/Employees/' +
			this.authService.getCurrUser().username, employeeSM, httpOptions);
	}
}