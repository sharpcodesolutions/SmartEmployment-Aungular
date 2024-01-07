import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { UserForAuthenticationDto } from '../../../core/models/user.for.authentication.dto';
import { AuthResponseDto } from '../../../core/models/auth.response.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../../../core/models/user';
import { tokenDecoder } from 'src/app/core/helpers/token.decoder';

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
   isLoading: boolean = false;

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
      this.isLoading = true;
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
            let roles = JSON.parse(window.atob(res.token.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
            roles = String(roles).split(','); 
            roles = String(roles).split(',');
            this.authService.sendAuthStateChangeNotification(res.isAuthSuccessful, user, roles);
            this.router.navigate([this.returnUrl]);
            this.isLoading = false;
         },
         error: (err: HttpErrorResponse) => {
            this.errorMessage = err.message;
            this.showError = true;
            this.isLoading = false;
         }
      })
   }
}