import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.sass']
})
export class SideMenuComponent implements OnInit {

  isUserAuthenticated: Boolean = false;
  authUser: User = {};
  isManager: boolean = false; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.isManager = this.authService.isUserManager();
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });
    this.authService.authUserChanged
    .subscribe(res => {
       this.authUser = res;
    });
    this.authService.isManagerChanged
    .subscribe(res => {
      this.isManager = res;
    });
    console.log('isManager is: ' + this.isManager + ' and the subject is: ');
    console.log('from the side menu'); 
  }

}
