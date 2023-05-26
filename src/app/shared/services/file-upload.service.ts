import { Injectable } from '@angular/core';
import { offset } from '@popperjs/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  // Returns an observable
  upload(file:any):Observable<any> {
  
    // Create form data
    const formData = new FormData(); 
      
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
      
    // Make http post request over api
    // with formData as req
    // return this.http.post(this.baseApiUrl, formData)
    return of(formData); 
  }
}
