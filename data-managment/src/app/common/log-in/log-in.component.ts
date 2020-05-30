import { Component, OnInit } from '@angular/core';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { LoginService } from '../../integration/login/login.service';
import { AuthenticationService } from '../../integration/authentication/authentication.service';
import { first } from 'rxjs/operators';

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

  constructor( 
    private router: Router, 
    private loginService: LoginService,
    private authenticationService : AuthenticationService) { }

  ngOnInit(): void {
  }

  passwordEyes(newValue: boolean){
    this.checkPassword = this.checkPassword !== newValue;
  }
  logInUser(){
      this.authenticationService.authenticate(this.logIn.email, this.logIn.password).pipe(first())
      .subscribe((data) =>{
          this.router.navigate(['/en/dashboard']);
      },
      );
  }
}
