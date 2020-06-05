import { Component, OnInit } from '@angular/core';
import { 
  faChartLine, 
  faUsers, 
  faLayerGroup,
  faEye, 
  faEyeSlash} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faChartLine =faChartLine;
  faUsers = faUsers;
  faLayerGroup = faLayerGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  public checkPassword = true;
  public showDashboardList= true;
  public showUserList =false;
  public showGroupList = false;
  public getDashboardData:any={};

  constructor() { }

  ngOnInit(): void {
  }
  passwordSuperAdminEyes(newValue: boolean){
    this.checkPassword = this.checkPassword !== newValue;
  }
  showDashboard(){
    this.showDashboardList = true;
    this.showUserList = false;
    this.showGroupList = false;
  }
  showUser(){
    this.showDashboardList = false;
    this.showUserList = true;
    this.showGroupList = false;
  }
  showGroup(){
    this.showDashboardList = false;
    this.showUserList = false;
    this.showGroupList = true;
  }

}
