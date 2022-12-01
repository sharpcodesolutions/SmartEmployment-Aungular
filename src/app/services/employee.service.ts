import { Injectable, PipeTransform } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { IEmployee } from '../sections/models/employee.model';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from '../shared/utils/sortable.directive';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';

interface SearchResult {
	employees: IEmployee[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1?: string | number | Date, v2?: string | number | Date) => (v1! < v2! ? -1 : v1! > v2! ? 1 : 0);

function sort(employees: IEmployee[], column: SortColumn, direction: string): IEmployee[] {
	if (direction === '' || column === '') {
		return employees;
	} else {
		return [...employees].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(employee: IEmployee, term: string, pipe: PipeTransform) {
	return (
		employee.firstname.toLowerCase().includes(term.toLowerCase()) ||
		employee.lastname.toLowerCase().includes(term.toLowerCase()) ||
		employee.employeeCode.toLowerCase().includes(term.toLowerCase()) ||
		employee.employeeEmail.toLowerCase().includes(term.toLowerCase()) 
	);
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
	private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _employees$ = new BehaviorSubject<IEmployee[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
  	private _employees: IEmployee[] = [];

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
	};

	constructor(private authService: AuthService, private http: HttpClient, private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._employees$.next(result.employees);
				this._total$.next(result.total);
			});

		this._search$.next();

     	this.http.get<IEmployee[]>('https://localhost:7197/api/Employees/' + 
      		this.authService.getCurrUser().username).subscribe(employees => {
			this._employees = employees;
		});
	}

	get employees$() {
		return this._employees$.asObservable();
	}
	get total$() {
		return this._total$.asObservable();
	}
	get loading$() {
		return this._loading$.asObservable();
	}
	get page() {
		return this._state.page;
	}
	get pageSize() {
		return this._state.pageSize;
	}
	get searchTerm() {
		return this._state.searchTerm;
	}

	set page(page: number) {
		this._set({ page });
	}
	set pageSize(pageSize: number) {
		this._set({ pageSize });
	}
	set searchTerm(searchTerm: string) {
		this._set({ searchTerm });
	}
	set sortColumn(sortColumn: SortColumn) {
		this._set({ sortColumn });
	}
	set sortDirection(sortDirection: SortDirection) {
		this._set({ sortDirection });
	}

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

	private _search(): Observable<SearchResult> {
		const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

		// 1. sort
		let employees = sort(this._employees, sortColumn, sortDirection);

		// 2. filter
		employees = employees.filter((employee) => matches(employee, searchTerm, this.pipe));
		const total = employees.length;

		// 3. paginate
		employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ employees, total });
	}
}