import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ManagerGuardGuard implements CanActivate {
   isUserAuthenticated: Boolean = false;
   authUser: User = {};
   isManager: boolean = false; 

   constructor(private authService: AuthService, private router: Router) {
      this.isUserAuthenticated = this.authService.isAuthenticated(); 
      this.authService.authChanged
      .subscribe(res => {
         this.isUserAuthenticated = res;
      });
      this.authService.authUserChanged
      .subscribe(res => {
         this.authUser = res;
      });
      // this.authService.isManagerChanged
      // .subscribe(res => {
      //    this.isManager = res;
      // });
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const user = this.authService.getCurrUser(); 
      // const roles = route.data['roles'];
      if(user && this.isManager) {
         return true;
      }
      else if(user && !this.isManager) {
         this.router.navigate(['/unauthorised']);
         return false; 
      }
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
   }

   checkLogin(url: string): boolean | UrlTree {
      console.log("Url: " + url)
      let val = this.authService.isAuthenticated();

      if(val){
         if(url == "/login")
            this.router.parseUrl('/manager');
         else 
            return true;
      } else {
         return this.router.parseUrl('/login?returnUrl=' + url);
      }
      return false;
   }
}
