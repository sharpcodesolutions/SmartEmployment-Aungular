import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
   selector: 'app-logout',
   templateUrl: './logout.component.html',
   styleUrls: ['./logout.component.sass']
})
export class LogoutComponent implements OnInit {

   constructor(private authService : AuthService, private router: Router) { }

   ngOnInit() {
      console.log('from the logout'); 
      this.authService.logout();
      this.router.navigate(['/']);
   }

}