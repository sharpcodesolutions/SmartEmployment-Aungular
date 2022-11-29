import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.sass']
})
export class TopMenuComponent implements OnInit {
  isUserAuthenticated: boolean = false;
  authUser: User = {}; 

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.isUserAuthenticated = this.authService.isAuthenticated(); 
    this.authService.authChanged
    .subscribe(res => {
       this.isUserAuthenticated = res;
    });
    this.authService.authUserChanged
    .subscribe(res => {
       this.authUser = res;
    });
    console.log('is auth at menue: ' + this.isUserAuthenticated);
  }

}
