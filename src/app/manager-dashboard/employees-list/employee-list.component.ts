import { HttpClient } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit, QueryList, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, noop, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EmployeeService } from '../services/employee.service';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { createHttpObservable } from 'src/app/shared/utils/utils';
import { IEmployee } from '../../core/models/employee.model';
import { TimeSpan } from '../../core/models/timespan';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { EmployeeComponent } from './employee/employee.component';
import { NotifictionService } from '../services/notifiction.service';
import { Directive, ElementRef, Input } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
// import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  isUserAuthenticated: boolean = false;

  employees:IEmployee[]=[];
  listData: MatTableDataSource<any> = new MatTableDataSource<any>();
  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'employeeCode', 'employeeEmail', 'startDate', 'terminationDate', 'birthDate', 'actions'];
  @ViewChild(MatSort) 
  sort?: MatSort
  @ViewChild(MatPaginator)
  paginator?: MatPaginator;
  searchKey: string = '';

  constructor(public employeeService: EmployeeService, private dialog: MatDialog, private notificationService: NotifictionService) {
    // this.employees$ = employeeService.employees$;
    // this.total$ = employeeService.total$; 
  }

  ngOnInit(): void {
    this.employeeService.GetEmployees().subscribe(employees => {
      this.listData = new MatTableDataSource(employees);
      this.sort?.sort(({ id: 'firstname', start: 'asc'}) as MatSortable);
      this.listData.sort = this.sort!;
      this.listData.paginator = this.paginator!;
      // this.listData.filterPredicate = (data, filter) => {
      //   return this.displayedColumns.some(ele => {
      //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1; 
      //   })
      // };
    })
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter(); 
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase(); 
  }

  onCreate() {
    this.employeeService.initialiseFormGroup(); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = '60%'; 
    // this.dialog.open(EmployeeComponent, dialogConfig);

    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '60%',
      disableClose: true
    });

    console.log('are we hitting this?'); 

    dialogRef.afterClosed().subscribe(result => {      
      console.log('The dialog was closed' + result);
      this.employeeService.GetEmployees().subscribe(employees => {
        this.listData = new MatTableDataSource(employees);
        this.listData.sort = this.sort!;
        this.listData.paginator = this.paginator!;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1; 
        //   })
        // };
      })
    });
  }

  onEdit(row:IEmployee) {
    this.employeeService.populateForm(row); 
    const dialogConfig = new MatDialogConfig(); 
    dialogConfig.disableClose = true; 
    dialogConfig.autoFocus = true; 
    dialogConfig.width = '60%'; 
    // this.dialog.open(EmployeeComponent, dialogConfig);

    const dialogRef = this.dialog.open(EmployeeComponent, {
      width: '60%', 
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {      
      console.log('The dialog was closed' + result);
      this.employeeService.GetEmployees().subscribe(employees => {
        this.listData = new MatTableDataSource(employees);
        this.listData.sort = this.sort!;
        this.listData.paginator = this.paginator!;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1; 
        //   })
        // };
      })
    });
  }

  onDelete(id:number) {
    if(confirm('Are you sure to delete this record?')) {
      this.employeeService.DeleteEmployee(id).subscribe(res => { console.log('employee deleted successfully'); });
      this.notificationService.warn('! Deleted succesfully'); 
      this.employeeService.GetEmployees().subscribe(employees => {
        this.listData = new MatTableDataSource(employees);
        this.listData.sort = this.sort!;
        this.listData.paginator = this.paginator!;
        // this.listData.filterPredicate = (data, filter) => {
        //   return this.displayedColumns.some(ele => {
        //     return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1; 
        //   })
        // };
      })
    }
  }
}

@Directive({
  selector: 'img[default]',
  host: {
    '(error)':'updateUrl()',
    '[src]':'src'
   }
})
export class DefaultImage {
  @Input() src:string='';
  @Input() default:string='../../../assets/images/51.jpeg';

  updateUrl() {
    this.src = this.default;
  }
}
