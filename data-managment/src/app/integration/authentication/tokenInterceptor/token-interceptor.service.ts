import { Injectable, Injector, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptor } from '@angular/common/http';
import { AuthenticationService } from '../../authentication/authentication.service';
import { environment } from '../../../../environments/environment';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private router : Router,
    private injector: Injector,
    @Inject(PLATFORM_ID) private platFormId: Object
  ) { }

intercept(req, next){
  let authService = this.injector.get(AuthenticationService);
  let tokenIsReq;

  let jwt = authService.getToken();
  if(jwt !==null){
    let isExpired = this.jwtExpired();
    if(isExpired){
      authService.logOut();
      this.router.navigateByUrl('/login');
    }
  }
  if(authService.getToken() != null && req.url.split('/')[2] === environment.host.split('/')[2]){
    tokenIsReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
  }else {
    tokenIsReq= req.clone({
      setHeaders:{}
    })
  }
  return next.handle(tokenIsReq).pipe(catchError( err => {
    if(err.status === 401){
      let authService = this.injector.get(AuthenticationService);
      authService.logOut();
    }
    const error = err.error.message || err.statusText;
    return throwError(error)
  }))
}
jwtExpired(){
  if(isPlatformBrowser(this.platFormId)){
    try{
      const token_parts = localStorage.getItem('jwt-token').split(/\./);
      const token_decoded = JSON.parse(window.atob(token_parts[1]));
      var current_time = Date.now().valueOf()/1000;
      return (current_time > token_decoded.exp)
    }catch{
      let authService = this.injector.get(AuthenticationService);
      authService.logOut()
    }
  }
}
}
