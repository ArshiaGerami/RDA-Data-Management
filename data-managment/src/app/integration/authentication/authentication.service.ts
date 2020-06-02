import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http' ;
import { environment } from '../../../environments/environment';


export interface JWT{
  token: string;
  user: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: any={};
  public currentUser: any ="";
  public userInfo: any =[];
  public relations: any=[];

  constructor( 
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object) {}

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
            if(userInfo.user){
              this.user = JSON.stringify(userInfo.user);
              if(isPlatformBrowser(this.platformId)){
                localStorage.setItem('user', this.user);
              }
              if(isPlatformBrowser(this.platformId)){
                this.userInfo = userInfo.user;
                if(this.userInfo.role === 0){
                  localStorage.setItem('currentUser', 'super-admin');
                }else if(this.userInfo.role === 1){
                  localStorage.setItem('currentUser', 'admin');
                }else if(this.userInfo.role === 2){
                  localStorage.setItem('currentUser', 'super-user');
                }else{
                  localStorage.setItem('currentUser', 'user')
                }
                this.relations = JSON.stringify(this.userInfo.relations);
                localStorage.setItem('relations', this.relations);
              }
            }
            
            if(isPlatformBrowser(this.platformId)){
              const token_parts= localStorage.getItem('jwt-token').split(/\./);
              const token_decoded= JSON.parse(window.atob(token_parts[1]));
            }
            if(this.userInfo.relations.length > 1){
              this.router.navigate(['/en/switch-account']);
            }
            else{
              for(let i=0; i< this.userInfo.relations.length; i++){
                  const check = this.userInfo.relations[i];
                  if(check.role === 0){
                    this.router.navigate(['/en/super-admin/dashboard']);
                  }
                  if(check.role === 1){
                    this.router.navigate(['/en/admin/dashboard']);
                  }
                  if (check.role === 2){
                    this.router.navigate(['/en/super-user/dashboard']);
                  }
                   if(check.role === 3){
                    this.router.navigate(['/en/user/dashboard']);
                  }
              }
            }
            
          }
        });
        return data
      })
    }
    public get currentUserValue(){
      if(isPlatformBrowser(this.platformId)){
        this.currentUser = localStorage.getItem('currentUser')
      }
      return this.currentUser;
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

