import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../app/integration/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'data-management';
  

  constructor(public authenticationService: AuthenticationService) {}
  loggedIn = this.authenticationService.isUserLoggedIn();

  ngOnInit(): void {
  }

  // checkLogIn(){
  //   if(this.authenticationService.isUserLoggedIn()){
  //     return  this.loggedIn =true;
  //   }else {
  //     return this.loggedIn = false;
  //   }
  // }
}
