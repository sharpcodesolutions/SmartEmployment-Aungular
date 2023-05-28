import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';

interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: 'app-dropdown',
  templateUrl: 'dropdown.component.html',
  //imports: [MatFormFieldModule, MatSelectModule, NgFor, MatInputModule, FormsModule],
})
export class DropdownComponent {
    constructor(private router: Router) {}
    roles: Food[] = [
        {value: 'employee', viewValue: 'Employee'},
        {value: 'manager', viewValue: 'Manager'},
        {value: 'admin', viewValue: 'Admin'},
    ];
    selected = 'employee';
    navigateToComponent(selectedValue: string) {
        if (selectedValue === 'employee') {
          this.router.navigate(['/employee']); // Replace '/employee' with the appropriate route for the EmployeeComponent
        } else if (selectedValue === 'manager') {
          this.router.navigate(['/manager']); // Replace '/manager' with the appropriate route for the ManagerComponent
        }
    }
}
