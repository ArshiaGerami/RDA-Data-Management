import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
  public dashboard ='';
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.dashboard=localStorage.getItem('dashboard');
  }
  goToDashboard(){
    this.route.navigate([this.dashboard]);
  }


}
