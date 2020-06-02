import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthenticationService} from '../authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})

export class RoleGuard implements CanActivate {
    constructor(
        private authenticationService : AuthenticationService,
        private router: Router,
    ){}

    canActivate(route: ActivatedRouteSnapshot){
        const currentUser: any = this.authenticationService.currentUserValue;  
            if (currentUser && this.authenticationService.isUserLoggedIn()){
                const expectedRole: any[] = route.data.expectedRole;
                let found = false;
                if(expectedRole.filter(value => -1 !==currentUser)){
                    found = true
                }            
                if(found){
                    return true
                }else{
                    this.router.navigate(['/en/login']);
                }
            }else{
                this.router.navigate(['/en/login']);
            }
    }
}