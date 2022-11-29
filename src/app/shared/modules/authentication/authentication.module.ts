import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../../components/login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from 'src/app/helpers/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
    ])
  ], 
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ErrorInterceptor,
    //   multi: true,
    // }
  ]
})
export class AuthenticationModule { }
