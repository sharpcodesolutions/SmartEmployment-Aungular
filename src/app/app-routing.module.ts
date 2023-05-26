import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager-dashboard/manager.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { EmployeeListComponent } from './manager-dashboard/employees-list/employee-list.component';
import { ManagerGuardGuard } from './core/guards/manager-guard.guard';
import { UnauthorisedComponent } from './shared/components/unauthorised/unauthorised.component';
import { AppComponent } from './app.component';
import { UnderConstructionComponent } from './shared/components/under-construction/under-construction.component';
import { ScheduleComponent } from './manager-dashboard/shedules-list/schedule.component';

const routes: Routes = [  
  { path: '', redirectTo: 'manager', pathMatch: 'full' },
  { path: 'manager', component: ManagerComponent, canActivate:[ManagerGuardGuard], children:[
   // { path:'employee-list', redirectTo: 'employee-list' }
  ]},
  { path: 'employee-list', component: EmployeeListComponent, canActivate: [ManagerGuardGuard] },
  { path: 'unauthorised', component: UnauthorisedComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'underconstruction', component: UnderConstructionComponent},
  // { path: 'schedule', loadChildren: () => import('./manager-dashboard/manager.module').then(x => x.ManagerModule), canActivate: [ManagerGuardGuard]},
  { path: 'schedule', component: ScheduleComponent, canActivate: [ManagerGuardGuard], children:[
  ]},
  { path: '**', redirectTo: 'mamanger', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    FormsModule, 
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
