import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlSerializer } from '@angular/router';

import { Observable, Subject, of, BehaviorSubject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { AuthResponseDto } from '../../core/models/auth.response.dto';
import { User } from '../../core/models/user';
import { UserForAuthenticationDto } from '../../core/models/user.for.authentication.dto';
import { EnvironmentUrlService } from './environment-url.service';
import { Roles } from 'src/app/core/models/roles';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private authChangeSub = new BehaviorSubject<boolean>(false); 
   public authChanged = this.authChangeSub.asObservable(); 
   private authUserSub = new BehaviorSubject<User>(null!); 
   public authUserChanged = this.authUserSub.asObservable(); 

   private authRoleSub = new BehaviorSubject<string[]>([]);
   public authRoleChanged = this.authRoleSub.asObservable(); 

   // private isManagerSub = new Subject<boolean>();  
   // public isManagerChanged = this.isManagerSub.asObservable();

   constructor(private http: HttpClient, private envUrl: EnvironmentUrlService) { 
      // this.authChangeSub.next(false); 
      if(localStorage["token"]) {
         this.authChangeSub.next(true);
         this.authUserSub.next(localStorage["user"]); 
         let roles = JSON.parse(window.atob(localStorage["token"].split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
         roles = String(roles).split(',');
         this.authRoleSub.next(roles); 
      }
      else { 
         this.authChangeSub.next(false); 
         this.authUserSub.next(null!); 
         this.authRoleSub.next(null!); 
      }          
   }

   public loginUser = (route: string, body: UserForAuthenticationDto) => {
      return this.http.post<AuthResponseDto>(this.createCompleteRoute(route, this.envUrl.urlAuthAddress), body);
   }

   public logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      this.sendAuthStateChangeNotification(false, null!, null!);
    }

   public sendAuthStateChangeNotification = (isAuthenticated: boolean, user: User, roles: string[]) => {
      this.authChangeSub.next(isAuthenticated);
      this.authUserSub.next(user); 
      this.authRoleSub.next(roles); 
      // this.isManagerSub.next(isManager);
      // this.isAuthenticated();
      // this.isUserManager();
   }

   public isAuthenticated = () => {
      if(localStorage["token"] && localStorage["user"]) {
         // this.authChangeSub.next(true)
         // this.authUserSub = new BehaviorSubject<User>(JSON.parse(localStorage.getItem("user")!));
         // this.authUserChanged = this.authUserSub.asObservable(); 
         return true;
      }          
      else
      {
         // this.authChangeSub.next(false)
         // this.authUserSub = new BehaviorSubject<User>(null!);
         // this.authUserChanged = this.authUserSub.asObservable(); 
         // this.sendAuthStateChangeNotification(false, null!, false, null!);
         return false; 
      }
   }

   public getRoles(): string[] {
      if(localStorage["token"]) {
         let roles = JSON.parse(window.atob(localStorage["token"].split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
         roles = String(roles).split(','); 
         return roles;
      }
      return [];
   }

   public getCurrUser = (): User => {
      if(localStorage["token"]) {
         let user:User = JSON.parse(localStorage["user"]);
         return user; 
      }          
      else
      {
         let user:User = {};
         return user;
      }
   }

   private createCompleteRoute = (route: string, envAddress: string) => {
      return `${envAddress}/${route}`;
   }
}