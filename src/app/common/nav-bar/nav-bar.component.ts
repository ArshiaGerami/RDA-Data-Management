import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
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
