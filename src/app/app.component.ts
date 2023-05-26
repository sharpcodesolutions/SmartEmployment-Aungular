import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { User } from './core/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isUserAuthenticated: boolean = false;
  authUser: User = {}; 

  constructor(private _authService: AuthService) {}

  ngOnInit() {
   console.log('authChanged from app: ' + this._authService.authChanged);
  }

  get authService() : AuthService {
   return this._authService; 
  }
}
