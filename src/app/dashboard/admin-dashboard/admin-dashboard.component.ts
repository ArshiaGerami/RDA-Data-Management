import { Component, OnInit } from '@angular/core';
import {
  faChartLine,
  faMap,
  faLayerGroup,
  faSortAmountDownAlt,
  faProjectDiagram,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../../integration/login/login.service';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  progress: number = 0;

  faChartLine = faChartLine;
  faMap = faMap;
  faLayerGroup = faLayerGroup;
  faSortAmountDownAlt = faSortAmountDownAlt;
  faProjectDiagram = faProjectDiagram;
  faTimes = faTimes;
  public sendFile = {
    files: [],
    userId: '',
    query: {
      group: ''
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
  public attachmentList:any[]=[]
  public checkSelector:any={};
  public storeAttachedFile:any[]=[];

  constructor(
    private loginService: LoginService,
    private constant: FileUploadService,) {}

  ngOnInit(): void {
    const check = JSON.parse(localStorage.getItem('relations'));;
    this.userId = check[0]._id;
    this.groupName = check[0].group._id;
    this.sendFile.userId = this.userId;
    this.sendFile.query.group = this.groupName;
  }
  displayDashboard() {
    this.showDashboard = true;
    this.showCatelouge = false;
    this.showMap = false;
    this.showProjectData = false;
  }
  displayMap() {
    this.showDashboard = false;
    this.showCatelouge = false;
    this.showMap = true;
    this.showProjectData = false;
  }
  displayCatelouge() {
    this.showDashboard = false;
    this.showCatelouge = true;
    this.showMap = false;
    this.showProjectData = false;
  }
  displayProjectData() {
    this.showDashboard = false;
    this.showCatelouge = false;
    this.showMap = false;
    this.showProjectData = true;
  }
  handleFileInput(files) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      let list: any={};
      list.name = file.name;
      list.type = file.type;
      list.size = file.size;
      this.attachmentList.unshift(list)
      const path = file.webkitRelativePath.split('/');
      this.sendFile.files.push({file:path})
    }
  }
  uploadFile() {
    this.getSetHeader = this.constant.addAutherization();
    this.loginService.uploadFile(this.sendFile, this.getSetHeader).toPromise().then(data => {
      console.log(data);
    }, error => {
      console.log(error)
    })
  }
  submitUser(event) {
          this.progress = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.progress}%`);
  }
  deleteFile(name:any){
    let fileIndex = this.attachmentList.findIndex(x => x.name === name);
    this.attachmentList.splice(fileIndex,1);
    this.storeAttachedFile.splice(fileIndex,1);
    if(this.attachmentList.length === 0){
    this.checkSelector.file='';
    }
  }

}
