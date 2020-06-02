import { Component, OnInit } from '@angular/core';
import { 
  faChartLine, 
  faUsers, 
  faLayerGroup,} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faChartLine =faChartLine;
  faUsers = faUsers;
  faLayerGroup = faLayerGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
