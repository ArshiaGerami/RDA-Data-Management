import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../integration/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  public userName = '';
  public profilePic = '';
  public getUser:any=[];
  public dashboard = '';
  constructor( 
    private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    this.dashboard = localStorage.getItem('dashboard')
    const check=localStorage.getItem('user');
    this.getUser = JSON.parse(check);
    this.userName = this.getUser.name;
     }

     logOut(){
       this.authenticationService.logOut();
       this.router.navigate(['/en/login']);
     }
}
