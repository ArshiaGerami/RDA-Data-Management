import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthenticationService } from '../../integration/authentication/authentication.service';
import { Router } from '@angular/router';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit, AfterViewInit {
  public userName = '';
  public profilePic = '';
  public getUser: any = [];
  public dashboard = undefined;
  public isUserlogedIn = false;
  public relation: any = [];
  public showRoles = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private switchAccount: FileUploadService) { }

  ngOnInit(): void {
    this.dashboard = localStorage.getItem('dashboard')
    if (!this.dashboard) {
      this.dashboard = '/en/switch-account'
    }
    this.relation = JSON.parse(localStorage.getItem('relations'));
    if (this.relation.length > 1) {
      this.showRoles = true;
    }
    const check = localStorage.getItem('user');
    this.getUser = JSON.parse(check);
    this.userName = this.getUser.name;
    setTimeout(() => {
      this.checkForAllowUser()
    },7000)
  }
  ngAfterViewInit(){
  }
  checkForAllowUser() {
      const checkLogin = localStorage.getItem('login');
      if (checkLogin === 'true') {
        this.isUserlogedIn = true;
      }
  }
  logOut() {
    this.authenticationService.logOut();
    this.router.navigate(['/en/login']);
  }
  switch(any: string) {
    this.switchAccount.switchAccount(any, this.userName)
  }
}