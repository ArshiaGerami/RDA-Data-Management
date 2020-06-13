import { Component, OnInit } from '@angular/core';
import { 
  faChartLine, 
  faMap, 
  faLayerGroup,
  faSortAmountDownAlt,
  faProjectDiagram,} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-super-user-dashboard',
  templateUrl: './super-user-dashboard.component.html',
  styleUrls: ['./super-user-dashboard.component.scss']
})
export class SuperUserDashboardComponent implements OnInit {

  faChartLine =faChartLine;
  faMap = faMap;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faProjectDiagram = faProjectDiagram

  constructor() { }

  ngOnInit(): void {
  }

}
