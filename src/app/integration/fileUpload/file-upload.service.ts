import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from'@angular/common';
import { MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from'@angular/material/snack-bar';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  public token='';
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platFormId:Object,
    private matSnackBar : MatSnackBar) { }

    openSnackBar(message:string, action:string){
      this.matSnackBar.open(message, action,{
        duration:5000,
        // verticalPosition:"top",
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        panelClass:['matSnackBar']
      });
    }

  public uploadImage(event):any{
    const file = event.target.files[0];
    if(file.type === "image/png" || file.type === "image/jpeg"){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return Observable.create(observer => {
        reader.onloadend = () => {
          observer.next(reader.result);
          observer.complete();
        }
      });
    }else{
      return Observable.create(observer => {
        observer.next(null);
        observer.complete();
      })
    }
  }
  public switchAccount(any:string, name:string){
    if(any === 'superAdmin'){
      if(isPlatformBrowser(this.platFormId)){
      this.router.navigate(['/en/'+name+'/super-admin/dashboard']);
      localStorage.setItem('dashboard', '/en/'+name+'/super-admin/dashboard');
      localStorage.setItem('login','true');
      }
    }else if(any === 'admin'){
      if(isPlatformBrowser(this.platFormId)){
      this.router.navigate(['/en/admin/'+name+'/dashboard']);
      localStorage.setItem('dashboard', '/en/admin/'+name+'/dashboard');
      localStorage.setItem('login','true');
      }
    }else if(any === 'superUser'){
      if(isPlatformBrowser(this.platFormId)){
      this.router.navigate(['/en/super-user/dashboard/'+name]);
      localStorage.setItem('dashboard', '/en/super-user/dashboard/'+name);
      localStorage.setItem('login','true');
      }
    }else if(any === 'user'){
      if(isPlatformBrowser(this.platFormId)){
      this.router.navigate(['/en/'+name+'/user/dashboard']);
      localStorage.setItem('dashboard', '/en/'+name+'/user/dashboard');
      localStorage.setItem('login','true');
      }
    }
    this.openSnackBar('You are login as ' + any,'');
  }
  addAutherization(){
    this.token = localStorage.getItem('jwt-token');
    const headers = new HttpHeaders().set('Authorization', this.token).set('x-access-token', this.token)
    .set('X-Requested-With','XMLHttpRequest')
    const setHeaders = {
      headers: headers
    }
    return setHeaders
  }
}
