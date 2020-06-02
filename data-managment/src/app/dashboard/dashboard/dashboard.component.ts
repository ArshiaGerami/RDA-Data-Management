import { Component, OnInit } from '@angular/core';
import { 
  faTachometerAlt, 
  faUsers, 
  faLayerGroup, faSortAmountDownAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faTachometerAlt =faTachometerAlt;
  faUsers = faUsers;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;

  constructor() { }

  ngOnInit(): void {
  }

}
