import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if ([401].indexOf(err.status) !== -1) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                this.authenticationService.logout();
                console.log('interceptor works, error');
            }
            else if ([403].indexOf(err.status) !== -1) {
                this.router.navigateByUrl('/unauthorised');
            }
            console.log('interceptor works, no error' + err.status + err.statusText);
            const error = err.error?.message || err.statusText;
            return throwError(error);
        }))
    }
}