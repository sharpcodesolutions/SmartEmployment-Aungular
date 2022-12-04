import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IEmployee } from '../sections/models/employee.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../shared/utils/sortable.directive';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class EmployeeService {	

	constructor(private authService: AuthService, private http: HttpClient, private pipe: DecimalPipe) {
		
	}

	form: FormGroup = new FormGroup({ 
		$id: new FormControl(null), 
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
			$id: null, 
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
}