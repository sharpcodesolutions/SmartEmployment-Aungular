import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public urlAuthAddress: string = 'https://smartemployment-authentication.azurewebsites.net';
  public urlAPIEmployees: string = 'https://smartemployment-api.azurewebsites.net/api/Employees/'; 
  public urlAPISchedules: string = 'https://smartemployment-api.azurewebsites.net/api/Employees/schedules/'; 
  constructor() { }
}
