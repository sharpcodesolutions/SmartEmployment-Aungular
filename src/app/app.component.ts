import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { User } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserAuthenticated: boolean = false;
  authUser: User = {}; 

  constructor(private authService: AuthService) {}

  ngOnInit() {
     this.isUserAuthenticated = this.authService.isAuthenticated(); 
     this.authService.authChanged
     .subscribe(res => {
        this.isUserAuthenticated = res;
     });
     this.authService.authUserChanged
     .subscribe(res => {
        this.authUser = res;
     });
  }
}
