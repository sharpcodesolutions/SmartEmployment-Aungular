import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {NgFor} from '@angular/common';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Roles } from 'src/app/core/models/roles';
import { AuthService } from 'src/app/shared/services/auth.service';

interface Role {
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
export class DropdownComponent implements OnInit {
    // @Input()
    userRoles: string[] = [];
    @Output()
    selectionChanged: EventEmitter<string> = new EventEmitter<string>(); 
    roles: Role[] = [];

    constructor(private router: Router, private authService:AuthService) {}

    ngOnInit(): void {
        this.userRoles = this.authService.getRoles();         
        this.authService.authRoleChanged.subscribe(res => {
            this.userRoles = res;
            this.roles = []; 
            if(this.userRoles && this.userRoles.length != 0) {
                if(this.userRoles.indexOf('Employee') !== -1)
                    this.roles.push({value: 'employee', viewValue: 'Employee'});
                if(this.userRoles.indexOf('Manager') !== -1)
                    this.roles.push({value: 'manager', viewValue: 'Manager'});
                if(this.userRoles.indexOf('Admin') !== -1)
                    this.roles.push({value: 'admin', viewValue: 'Admin'});
            }
        });
    }
    selected = 'employee';
    navigateToComponent(selectedValue: string) {
        this.selectionChanged.emit(selectedValue); 
        // if (selectedValue === 'employee') {
        //   this.router.navigate(['/employee']); // Replace '/employee' with the appropriate route for the EmployeeComponent
        // } else if (selectedValue === 'manager') {
        //   this.router.navigate(['/manager']); // Replace '/manager' with the appropriate route for the ManagerComponent
        // }
    }
}
