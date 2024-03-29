import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to api url
        const user = this.authenticationService.getCurrUser();
        const isLoggedIn = user && user.token;
        if (isLoggedIn) {
            // request = request.clone({
            //     setHeaders: {
            //         Authorization: `Bearer ${user.token}`,
            //     }
            // });
            
            const headers = new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Methods': '*', 
                // 'Access-Control-Allow-Headers': 'Content-Type',   
                //'Access-Control-Allow-Credentials': 'true',             
                'Authorization': `Bearer ${user.token}`,
            });
            
           request = request.clone({headers});
        }      

        return next.handle(request);
    }
}