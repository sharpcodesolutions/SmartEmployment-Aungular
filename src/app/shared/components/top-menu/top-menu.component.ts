import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../../core/models/user';
import { Router } from '@angular/router';
import { Roles } from 'src/app/core/models/roles';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  isUserManager: boolean = false;
  authUser: User = {}; 
  currentRole: Roles = 1; 
  userRoles: string[] = []; 

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef, private router: Router) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.isUserManager = this.authService.isUserManager();
    this.authUser = this.authService.getCurrUser(); 
    this.userRoles = this.authService.getRoles(); 
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });
    this.authService.authUserChanged
    .subscribe(res => {
       this.authUser = res;
    });
    this.authService.authRoleChanged
    .subscribe(res => {
      this.userRoles = res;
    });
    console.log('from the top menu, is auth is: ' + this.isUserAuthenticated);
    console.log('from the top menu, token is: ' + localStorage["token"]);
    console.log('from the top menu, user is: ' + localStorage["user"]);
    console.log('from top menu, user is: ' + this.authUser); 
    console.log('from top menu, user is a manager? ' + this.isUserManager);
  }

  selectionChanged(selectedValue: string) : void {
    if (selectedValue === 'employee') {
      this.currentRole = Roles.employee;
      console.log('from selectionChanged and employee'); 
      this.router.navigate(['/employee']); // Replace '/employee' with the appropriate route for the EmployeeComponent
    } else if (selectedValue === 'manager') {
      this.currentRole = Roles.manager; 
      console.log('from selectionChanged and manager');
      this.router.navigate(['/manager']); // Replace '/manager' with the appropriate route for the ManagerComponent
    } else if (selectedValue === 'admin') {
      this.currentRole = Roles.admin; 
      console.log('from selectionChanged and admin');
      this.router.navigate(['/admin']); // Replace '/manager' with the appropriate route for the ManagerComponent
    }
  }

  // ngAfterViewInit() {
  //   this.cdr.detectChanges();
  // }

}
