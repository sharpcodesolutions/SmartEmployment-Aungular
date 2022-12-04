import { HttpClient } from '@angular/common/http';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { map, noop, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/utils/sortable.directive';
import { createHttpObservable } from 'src/app/shared/utils/utils';
import { IEmployee } from '../../models/employee.model';
//import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.sass']
})
export class EmployeeListComponent implements OnInit {
  isUserAuthenticated: boolean = false;

  // employees:IEmployee[]=[];
  employees$: Observable<IEmployee[]> = of([]);
	total$: Observable<number> = of(0);

  @ViewChildren(NgbdSortableHeader)  
  headers?: QueryList<NgbdSortableHeader>;

  constructor(private authService:AuthService, public employeeService: EmployeeService) {
    // this.employees$ = employeeService.employees$;
    // this.total$ = employeeService.total$; 
  }

  ngOnInit(): void {
    // console.log('from the employee list');
    // this.isUserAuthenticated = this.authService.isAuthenticated(); 
    // this.authService.authChanged
    // .subscribe(res => {
    //    this.isUserAuthenticated = res;
  // });
    
    // const employees$ = this.http.get<IEmployee[]>('https://localhost:7197/api/Employees/' + 
    //   this.authService.authUserSub.getValue().username);
    //createHttpObservable('https://localhost:7197/api/Employees', this.authService.authUserSub.getValue().token);

    // const employees = http$
    //   .pipe(
    //     map(res => Object.values(res))
    //   );

    // employees$.subscribe(
    //   (employees) => this.employees$ = employees, 
    //   noop, 
    //   () => console.log('completed')
    // );
  }

  // onSort({ column, direction }: SortEvent) {
	// 	// resetting other headers
	// 	this.headers?.forEach((header) => {
	// 		if (header.sortable !== column) {
	// 			header.direction = '';
	// 		}
	// 	});

	// 	this.employeeService.sortColumn = column;
	// 	this.employeeService.sortDirection = direction;
	// }

}
