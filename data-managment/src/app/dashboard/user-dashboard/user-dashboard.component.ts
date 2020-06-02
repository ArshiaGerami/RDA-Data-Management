import { Component, OnInit } from '@angular/core';
import { 
  faChartLine, 
  faMap, 
  faLayerGroup,
  faSortAmountDownAlt,
  faProjectDiagram,} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {

  faChartLine =faChartLine;
  faMap = faMap;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faProjectDiagram = faProjectDiagram

  constructor() { }

  ngOnInit(): void {
  }

}
