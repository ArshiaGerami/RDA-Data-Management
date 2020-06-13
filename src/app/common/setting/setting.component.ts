import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from'@angular/material/snack-bar';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  public checkPassword = true;
  public checkConfirmPassword =true;
  public checkCurrentPassword = true;
  public dashboard= '';
  public change:any={};
  constructor( 
    private router: Router,
    private matSnackBar : MatSnackBar) { }

  openSnackBar(message:string, action:string){
    this.matSnackBar.open(message, action,{
      duration:5000,
      verticalPosition:"top",
      panelClass:['matSnackBar']
    });
  }

  ngOnInit(): void {
    this.dashboard = localStorage.getItem('dashboard');
  }
  cancel(){
    this.router.navigate([this.dashboard])
  }
  passwordEyes(newValue: boolean){
    this.checkPassword = this.checkPassword !== newValue;
  }
  confirmPasswordEye(newValue:boolean){
    this.checkConfirmPassword = this.checkConfirmPassword !==newValue;
  }
  currentPasswordEye(newValue:boolean){
    this.checkCurrentPassword = this.checkCurrentPassword !==newValue;
  }
  changePasswordButton(){
    if(this.change.Password !== this.change.confirmPassword){
      this.openSnackBar('Confrim password and new password are not matched','')
    }
  }

}
