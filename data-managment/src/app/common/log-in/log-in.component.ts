import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

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

  constructor( private router: Router) { }

  ngOnInit(): void {
  }

  passwordEyes(newValue: boolean){
    if (this.checkPassword === newValue){
      this.checkPassword = false;
    } else{
      this.checkPassword = true;
    }
  }
  temporaryLogin(){
    if (this.logIn.email === 'admin@rda.com' && this.logIn.password === 'admin@123' ){
      this.router.navigate(['/en/dashboard']);
      localStorage.setItem('temporary', 'login');
    }else{
      alert('Either email or password is wrong ');
    }
  }
}
