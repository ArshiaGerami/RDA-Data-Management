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
  public url = "";

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
    this.getUser =  JSON.parse(localStorage.getItem('user'))
    this.userName = this.getUser.name;
    if(this.getUser.avatar){
      this.url ='http://45.77.238.50:4000/'+ this.getUser.avatar;
      }
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
  switch(any: string, groupId:string) {
    this.switchAccount.switchAccount(any,groupId, this.userName)
  }
}
