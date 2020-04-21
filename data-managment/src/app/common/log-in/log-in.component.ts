import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';

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
}
