import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerComponent } from './sections/manager-dashboard/manager/manager.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './sections/manager-dashboard/employee-list/employee-list.component';
import { EmployeeCardComponent } from './sections/manager-dashboard/employee-card/employee-card.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './shared/components/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ManagerGuardGuard } from './helpers/manager-guard.guard';
import { UnauthorisedComponent } from './shared/components/unauthorised/unauthorised.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { AuthenticationModule } from './shared/modules/authentication/authentication.module';
import { SideMenuComponent } from './shared/components/side-menu/side-menu.component';
import { TopMenuComponent } from './shared/components/top-menu/top-menu.component';
import { UnderConstructionComponent } from './shared/components/under-construction/under-construction.component';
import { EmployeeService } from './services/employee.service';
import { AuthService } from './services/auth.service';
import { DecimalPipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdSortableHeader } from './shared/utils/sortable.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeModule } from './sections/manager-dashboard/employee-list/employee.module';
import { EmployeeComponent } from './sections/manager-dashboard/employee-list/employee/employee.component';
import { DialogRef } from '@angular/cdk/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    AppComponent,
    ManagerComponent,
    PageNotFoundComponent,
    LogoutComponent,
    LoginComponent,
    EmployeeListComponent, 
    EmployeeCardComponent, UnauthorisedComponent, SideMenuComponent, TopMenuComponent, UnderConstructionComponent, 
    NgbdSortableHeader, 
    EmployeeComponent
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
      { path: 'authentication', loadChildren: () => import('./shared/modules/authentication/authentication.module').then(m => m.AuthenticationModule) }
    ]),
    NgbModule,
    BrowserAnimationsModule, 
    MatDialogModule, 
    EmployeeModule, 
    MatInputModule, 
    MatTableModule, 
    MatPaginatorModule, 
    MatSortModule
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
  entryComponents: [EmployeeComponent]
})
export class AppModule { }
