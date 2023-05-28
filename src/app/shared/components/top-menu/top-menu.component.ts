import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from '../../../core/models/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  authUser: User = {}; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.authUser = this.authService.getCurrUser(); 
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });
    this.authService.authUserChanged
    .subscribe(res => {
       this.authUser = res;
    });
    console.log('from the top menu, is auth is: ' + this.isUserAuthenticated);
    console.log('from the top menu, token is: ' + localStorage["token"]);
    console.log('from the top menu, user is: ' + localStorage["user"]);
    console.log('from top menu, user is: ' + this.authUser); 
  }

}
