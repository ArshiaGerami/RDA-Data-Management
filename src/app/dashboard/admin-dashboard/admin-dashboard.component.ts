import { Component, OnInit } from '@angular/core';
import { 
  faChartLine, 
  faMap, 
  faLayerGroup,
  faSortAmountDownAlt,
  faProjectDiagram,} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  faChartLine =faChartLine;
  faMap = faMap;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faProjectDiagram = faProjectDiagram

  constructor() { }

  ngOnInit(): void {
  }

}
