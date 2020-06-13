import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../integration/authentication/authentication.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from'@angular/material/snack-bar';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  faEye = faEye;
  faEyeSlash = faEyeSlash;
  public logIn: any = {};
  public checkPassword = true;
  public check:any=[];

  constructor( 
    private authenticationService : AuthenticationService,
    private matSnackBar : MatSnackBar) { }

    openSnackBar(message:string, action:string){
      this.matSnackBar.open(message, action,{
        duration:5000,
        verticalPosition:"top",
        panelClass:['matSnackBar']
      });
    }

  ngOnInit(): void {
  }
  passwordEyes(newValue: boolean){
    this.checkPassword = this.checkPassword !== newValue;
  }
  logInUser(){
      this.authenticationService.authenticate(this.logIn.email, this.logIn.password).pipe(first())
      .subscribe(data =>{
      }, error =>{
        this.openSnackBar('Either username or password is wrong','');
      } 
      );
  }
}
