import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../integration/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  public userName = 'Michelle';
  public profilePic = '';
  constructor( 
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
     }

     logOut(){
       this.authenticationService.logOut();
       this.router.navigate(['/en/login']);
     }
}
