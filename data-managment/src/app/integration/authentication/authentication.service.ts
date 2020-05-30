import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable} from 'rxjs';
import { HttpClient } from '@angular/common/http' ;
import { environment } from '../../../environments/environment';


export interface JWT{
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Ob
  public user: any={};
  public currentUser: any ="";
  public userInfo: any ={};

  constructor( 
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) { }

    authenticate(email, password){
      return this.http.post<JWT>(environment.host +'/auth' + '/login',{
        email,
        password
      }).pipe((data) => {
        data.subscribe( userInfo =>{
          if(userInfo){
            if(userInfo.token){
              if(isPlatformBrowser(this.platformId)){
                localStorage.setItem('jwt-token', userInfo.token)
              }
            }
            if(isPlatformBrowser(this.platformId)){
              const token_parts= localStorage.getItem('jwt-token').split(/\./);
              const token_decoded= JSON.parse(window.atob(token_parts[1]));
            }
            this.router.navigate(['/en/dashboard']);
          }
        });
        return data
      });
    }
    isUserLoggedIn(){
      if(isPlatformBrowser(this.platformId)){
        return !!localStorage.getItem('jwt-token');
      }
    }
    logOut(){
      if(isPlatformBrowser(this.platformId)){
        localStorage.removeItem('jwt-token');
        localStorage.clear();
        this.router.navigate(['/en/login']);
      }
    }
    getToken(){
     if(isPlatformBrowser(this.platformId)){
       return localStorage.getItem('jwt-token');
     }
    }
}

