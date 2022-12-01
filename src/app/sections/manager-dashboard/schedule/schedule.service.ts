import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { ISchedule } from './schedule.model';

interface State {
	page: number;
	pageSize: number;
	// searchTerm: string;
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
		// searchTerm: '',
		// sortColumn: '',
		// sortDirection: '',
	};

  constructor(private authService: AuthService, private http: HttpClient) { 
    this.http.get<ISchedule[]>('https://localhost:7197/api/Employees/' + 
      		this.authService.getCurrUser().username).subscribe(schedules => {
			this._schedules = schedules;
		});
  }
}
