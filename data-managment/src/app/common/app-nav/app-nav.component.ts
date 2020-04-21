import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-nav',
  templateUrl: './app-nav.component.html',
  styleUrls: ['./app-nav.component.scss']
})
export class AppNavComponent implements OnInit {
  public userName = 'Michelle';
  public isLoggedIn = false;
  constructor() { }

  ngOnInit(): void {
    this.checkLogin();
  }

  checkLogin(){
    const check = localStorage.getItem('temporary');
    setTimeout(() => {
      if (check === 'login'){
        this.isLoggedIn = true;
      }
    }, 500);
  }
}
