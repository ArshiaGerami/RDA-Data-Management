import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { MatSnackBar } from'@angular/material/snack-bar';
import { LoginService } from '../../integration/login/login.service';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';

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
  public getSetHeader: any = {};
  public getId:any =[];
  constructor( 
    private router: Router,
    private matSnackBar : MatSnackBar,
    private loginService : LoginService,
    private constant : FileUploadService) { }

  openSnackBar(message:string, action:string){
    this.matSnackBar.open(message, action,{
      duration:5000,
      verticalPosition:"top",
      panelClass:['matSnackBar']
    });
  }

  ngOnInit(): void {
    this.dashboard = localStorage.getItem('dashboard');
    this.getId  = JSON.parse(localStorage.getItem('user'))
    this.change.id = this.getId.id
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
    if(this.change.newPassword !== this.change.confirmedPassword){
      this.openSnackBar('Confrim password and new password are not matched','')
    }else{
      this.getSetHeader = this.constant.addAutherization();
      this.loginService.changePass(this.change,this.getSetHeader).toPromise().then(data => {
        this.openSnackBar('Password has been updated successfully','')
      }, error => {
        this.openSnackBar('Somthing went wrong please try again later','')
      });
    }
  }

}
