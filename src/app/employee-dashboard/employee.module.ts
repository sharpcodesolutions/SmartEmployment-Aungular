import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Import components specific to the employee dashboard
import { EmployeeComponent } from './employee.component';

@NgModule({
  declarations: [
    // Declare the components specific to the employee dashboard
    EmployeeComponent
  ],
  imports: [
    RouterModule.forChild([
      // Define the routes for the employee dashboard components
      {
        path: '',
        component: EmployeeComponent,
        children: [
          { path: 'employee', component: EmployeeComponent }
        ]
      }
    ])
  ], 
  exports: [
  ], 
  providers: [
  ]
})
export class EmployeeModule { }
