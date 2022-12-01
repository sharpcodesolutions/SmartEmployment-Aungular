import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ISchedule } from './schedule.model';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

interface SearchResult {
	schedules: ISchedule[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	// sortColumn: SortColumn;
	// sortDirection: SortDirection;
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _schedules$ = new BehaviorSubject<ISchedule[]>([]);
	private _total$ = new BehaviorSubject<number>(0);
  private _schedules: ISchedule[] = [];

	private _state: State = {
		page: 1,
		pageSize: 7,
		searchTerm: '',
		// sortColumn: '',
		// sortDirection: '',
	};

  constructor(private authService: AuthService, private http: HttpClient) { 
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._schedules$.next(result.schedules);
				this._total$.next(result.total);
			});

		this._search$.next();

    this.http.get<ISchedule[]>('https://localhost:7197/api/Employees/' + 
      this.authService.getCurrUser().username).subscribe(schedules => {
			this._schedules = schedules;
		});
  }

  get employees$() {
		return this._schedules$.asObservable();
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
	// set sortColumn(sortColumn: SortColumn) {
	// 	this._set({ sortColumn });
	// }
	// set sortDirection(sortDirection: SortDirection) {
	// 	this._set({ sortDirection });
	// }

	private _set(patch: Partial<State>) {
		Object.assign(this._state, patch);
		this._search$.next();
	}

  private _search(): Observable<SearchResult> {
		const { pageSize, page, searchTerm } = this._state;

		// 1. sort
		let schedules = this._schedules;

		// 2. filter
		// schedules = schedules.filter((schedule) => matches(schedule, searchTerm, this.pipe));
		const total = 7;

		// 3. paginate
		// employees = employees.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
		return of({ schedules, total });
	}
}
