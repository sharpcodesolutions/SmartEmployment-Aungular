import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AuthResponseDto } from '../shared/models/auth.response.dto';
import { User } from '../shared/models/user';
import { UserForAuthenticationDto } from '../shared/models/user.for.authentication.dto';
import { EnvironmentUrlService } from './environment-url.service';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private authChangeSub = new Subject<boolean>(); 
   public authChanged = this.authChangeSub.asObservable(); 

   public authUserSub: BehaviorSubject<User> = new BehaviorSubject<User>(null!); 
   public authUserChanged = this.authUserSub.asObservable(); 

   public isManagerSub = new Subject<boolean>();  
   public isManagerChanged = this.isManagerSub.asObservable();

   constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { 
      this.isAuthenticated();
   }

   public loginUser = (route: string, body: UserForAuthenticationDto) => {
      return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAddress), body);
   }

   public logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.sendAuthStateChangeNotification(false, null!, false);
    }

   public sendAuthStateChangeNotification = (isAuthenticated: boolean, user: User, isManager: boolean) => {
      this.authChangeSub.next(isAuthenticated);
      this.authUserSub.next(user); 
      this.isManagerSub.next(isManager);
      this.isAuthenticated();
      this.isUserManager();
   }

   public isAuthenticated = () => {
      if(localStorage["token"]) {
         this.authChangeSub.next(true)
         this.authUserSub = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")!));
         this.authUserChanged = this.authUserSub.asObservable(); 
         return true;
      }          
      else
      {
         this.authChangeSub.next(false)
         this.authUserSub = new BehaviorSubject<User>(null!);
         this.authUserChanged = this.authUserSub.asObservable(); 
         return false; 
      }
   }

   public isUserManager = () => {
      if(localStorage["token"]) {
         let roles = JSON.parse(window.atob(localStorage["token"].split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
         roles = String(roles).split(',');
         let isManager = (roles.indexOf('Manager') !== -1);
         this.isManagerSub.next(isManager);
         this.isManagerChanged = this.isManagerSub.asObservable();
         return true;
      }          
      else
      {
         this.isManagerSub.next(false)
         this.isManagerChanged = this.isManagerSub.asObservable(); 
         return false; 
      }
   }

   private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
   }
}