import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserForAuthenticationDto } from '../../models/user.for.authentication.dto';
import { AuthResponseDto } from '../../models/auth.response.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../models/user';
import { tokenDecoder } from 'src/app/helpers/token.decoder';

@Component({
   selector: 'app-login',
   templateUrl: './login.component.html',
   styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
   private returnUrl: string = '';
  
   loginForm!: FormGroup;
   errorMessage: string = '';
   showError: boolean = false;

   constructor(private authService : AuthService, private router : Router, private route: ActivatedRoute) { }

   ngOnInit() {
      this.loginForm = new FormGroup({
         username: new FormControl("", [Validators.required]),
         password: new FormControl("", [Validators.required])
       })
       this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
   }

   validateControl = (controlName: string) => {
      return this.loginForm?.get(controlName)?.invalid && this.loginForm?.get(controlName)?.touched
   }
   hasError = (controlName: string, errorName: string) => {
      return this.loginForm?.get(controlName)?.hasError(errorName)
   }
    
   loginUser = (loginFormValue : any) => {
      this.showError = false;
      const login = {... loginFormValue };
      const userForAuth: UserForAuthenticationDto = {
        email: login.username,
        password: login.password, 
        token: ''
      }

      this.authService.loginUser('api/Accounts/Login', userForAuth)
         .subscribe({
            next: (res:AuthResponseDto) => {
               localStorage.setItem("token", res.token);
               let user:User = {username: userForAuth.email, token: res.token}; 
               localStorage.setItem("user", JSON.stringify(user)); 
               console.log(tokenDecoder.decodeToken(res.token));
               let roles = JSON.parse(window.atob(res.token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]

               console.log('the token is: ' + roles);
               roles = String(roles).split(',');
               console.log('the roles now are: ' + roles);
               console.log('isManager at loginn is: ' + (roles.indexOf('Manager') !== -1));
               this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful, user, roles.indexOf('Manager') !== -1);
               this.router.navigate([this.returnUrl]);
            },
            error: (err: HttpErrorResponse) => {
               this.errorMessage = err.message;
               this.showError = true;
            }
         })
   }
}