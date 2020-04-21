import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signUp: any = {};
  public checkPassword = true;
  public checkConfirmPassword = true;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor() { }

  ngOnInit(): void {
  }

  passwordEyes(newValue: boolean){
    if (this.checkPassword === newValue){
      this.checkPassword = false;
    } else{
      this.checkPassword = true;
    }
  }
  confirmPasswordEyes(newValue: boolean){
    if (this.checkConfirmPassword === newValue){
      this.checkConfirmPassword = false;
    } else {
      this.checkConfirmPassword = true;
    }
  }

}
