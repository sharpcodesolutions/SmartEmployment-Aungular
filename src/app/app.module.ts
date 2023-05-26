import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManagerGuardGuard } from './core/guards/manager-guard.guard';
import { UnauthorisedComponent } from './shared/components/unauthorised/unauthorised.component';
import { JwtInterceptor } from './core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { AuthenticationModule } from './shared/modules/authentication.module';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { UnderConstructionComponent } from './shared/components/under-construction/under-construction.component';
import { EmployeeService } from './manager-dashboard/services/employee.service';  
import { AuthService } from './shared/services/auth.service';
import { DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogRef } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ManagerModule } from './manager-dashboard/manager.module';
import { NgbdSortableHeader } from './shared/directives/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LogoutComponent,
    LoginComponent,
    UnauthorisedComponent, SideMenuComponent, TopMenuComponent, UnderConstructionComponent, 
    NgbdSortableHeader
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthenticationModule,
    FormsModule,
    ReactiveFormsModule, 
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'authentication', loadChildren: () => import('./shared/modules/authentication.module').then(m => m.AuthenticationModule) }
    ]),
    NgbModule,
    BrowserAnimationsModule, 
    MatDialogModule, 
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule, 
    ManagerModule
  ],
  providers: [
    ManagerGuardGuard, 
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, 
    EmployeeService, 
    DecimalPipe, 
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  bootstrap: [AppComponent], 
})
export class AppModule { }
