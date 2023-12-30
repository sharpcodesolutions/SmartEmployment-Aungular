import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentUrlService {
  public urlAddress: string = 'https://smartemployment-authentication-api.azure-api.net/auth';
  constructor() { }
}
