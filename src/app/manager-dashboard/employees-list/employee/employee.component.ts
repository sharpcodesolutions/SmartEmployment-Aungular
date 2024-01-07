import { Component, OnInit } from '@angular/core';
import { IEmployee } from 'src/app/core/models/employee.model';
import { EmployeeService } from '../../services/employee.service'; 
import { NotifictionService } from '../../services/notifiction.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FileUploadService } from 'src/app/shared/services/file-upload.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  loading: boolean = false; // Flag variable
  file?: File; // Variable to store file

  // Variable to store shortLink from api response
  shortLink: string = "";
  isSaving: boolean = false;

  constructor(private service: EmployeeService, private notificationService: NotifictionService, 
    public dialogRef: MatDialogRef<EmployeeComponent>, private fileUploadService: FileUploadService) {

  }

  ngOnInit(): void {    
  }

  get employeeService() {
    return this.service;
  }

  onClear() {
    this.service.form.reset(); 
    this.service.initialiseFormGroup(); 
  }

  onSubmit() {
    if(this.employeeService.form.valid) {
      this.isSaving = true; 
      if(this.employeeService.form.get('id')?.value === 0)
      {
        this.employeeService.AddEmployee(this.employeeService.form.value)
        .subscribe(employee => {      
          this.employeeService.form.reset();
          this.employeeService.initialiseFormGroup();
          this.notificationService.success('Employee created successfully');
          this.isSaving = false;
          this.onClose(); 
        });
      }
      else 
      {
        this.employeeService.UpdateEmployee(this.employeeService.form.value)
        .subscribe(employee => {
          this.employeeService.form.reset();
          this.employeeService.initialiseFormGroup();
          this.notificationService.success('Employee created successfully');
          this.isSaving = false;
          this.onClose(); 
        });
      }
    }
  }

  onClose() {
    this.employeeService.form.reset(); 
    this.employeeService.initialiseFormGroup(); 
    this.dialogRef.close(); 
  }

  onChange(event:any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe(
        (event: any) => {
            if (typeof (event) === 'object') {

                // Short link via api response
                this.shortLink = event.link;
                this.loading = false; // Flag variable 
            }
        }
    );
  }
}
