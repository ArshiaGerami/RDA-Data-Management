import { Component, OnInit } from '@angular/core';
import {
  faChartLine,
  faMap,
  faLayerGroup,
  faSortAmountDownAlt,
  faProjectDiagram,
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../integration/login/login.service';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';
import { Observable } from 'rxjs';

export class Files{
  files:[{
    file:string;
  }]
  userId:string
  query:{
    group:string
  }
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  faChartLine = faChartLine;
  faMap = faMap;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faProjectDiagram = faProjectDiagram
  public sendFile={
    files:[],
    userId:'',
    query:{
      group:''
    }
  };
  public getSetHeader: any = {};
  public userId = '';
  public groupName = '';
  public fileToUpload: File = null;
  public showDashboard = true;
  public showMap = false;
  public showCatelouge = false;
  public showProjectData = false;

  constructor(
    private loginService: LoginService,
    private constant: FileUploadService) { }

  ngOnInit(): void {
    const check = JSON.parse(localStorage.getItem('relations'));;
    this.userId = check[0]._id;
    this.groupName = check[0].group._id;
    this.sendFile.userId = this.userId;
    this.sendFile.query.group = this.groupName;
  }
  displayDashboard(){
    this.showDashboard = true;
    this.showCatelouge = false;
    this.showMap = false;
    this.showProjectData = false;
  }
  displayMap(){
    this.showDashboard = false;
    this.showCatelouge = false;
    this.showMap = true;
    this.showProjectData = false;
  }
  displayCatelouge(){
    this.showDashboard = false;
    this.showCatelouge = true;
    this.showMap = false;
    this.showProjectData = false;
  }
  displayProjectData(){
    this.showDashboard = false;
    this.showCatelouge = false;
    this.showMap = false;
    this.showProjectData = true;
  }
  handleFileInput(event){
    console.log(event);
   this.constant.uploadFileAndFolder(event).subscribe((data:any)=> {
     console.log(data);
     if(data){
      this.sendFile.files.push({file:data});
      console.log(this.sendFile.files);
     }
   });
  // Array.prototype.forEach.call(files, file => {
  //   this.sendFile.files.push(file.webkitRelativePath);
  // });
  }
    uploadFile(){
      this.getSetHeader = this.constant.addAutherization();
      console.log(this.sendFile);
      let formData = new FormData();
    // for (var i = 0; i < this.sendFile.files.length; i++) {
    //     formData.append("uploads[]", this.sendFile.files[i]);
    // }  
    console.log(formData);
      this.loginService.uploadFile(this.sendFile, this.getSetHeader).toPromise().then(data => {
        console.log(data);

      }, error => {

      })
    }

  }
