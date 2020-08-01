import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';  
import { catchError, map } from 'rxjs/operators'; 


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
  // public sendFile = {
  //   files: [],
  //   userId: '',
  //   query: {
  //     group: ''
  //   }
  // };
  public sendFile:any={}
  public getSetHeader: any = {};
  public userId = '';
  public groupName = '';
  public fileToUpload: File = null;
  public showDashboard = true;
  public showMap = false;
  public showCatelouge = false;
  public showProjectData = false;
  public attachmentList:any[]=[]
  // public checkSelector:any={};
  public storeAttachedFile:any[]=[];

  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;files  = [];  
  constructor(
    private loginService: LoginService,
    private constant: FileUploadService,) {}

  ngOnInit(): void {
    const check = JSON.parse(localStorage.getItem('relations'));;
    this.userId = check[0]._id;
    this.groupName = check[0].group._id;
    this.sendFile.userId = this.userId;
    this.sendFile.groupId = this.groupName;
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
  // handleFileInput(files) {
    
  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     console.log(files)
  //     let list: any={};
  //     list.name = file.name;
  //     list.type = file.type;
  //     list.size = file.size;
  //     this.attachmentList.unshift(list)
  //     const path = file.webkitRelativePath.split('/');
  //     this.sendFile.file = path
  //   }
  // }
  uploadFile(file) {
    console.log('File', file.data)
    const formData = new FormData();  
    formData.append('file', file.data);  
    console.log(formData.append('file', file.data))
    file.inProgress = true;  
    this.getSetHeader = this.constant.addAutherization();
    this.loginService.uploadFile(this.sendFile, this.getSetHeader).pipe(
      map( event => {
        switch (event.type){
          case HttpEventType.UploadProgress:
            file.progress = Math.round(event.loaded * 100 / event.total);
            break;
            case HttpEventType.Response:
              return event
        }
      }),
      catchError((error: HttpErrorResponse) => {  
        file.inProgress = false;  
        return of(`${file.data.name} upload failed.`);  
      })).subscribe((event: any) => {  
        if (typeof (event) === 'object') {  
          console.log(event.body);  
        }  
      }); 
  }

  private uploadFiles() {  
    this.fileUpload.nativeElement.value = '';  
    this.files.forEach(file => {  
      console.log(file)
      this.uploadFile(file);  
    });  
}

onClick() {  
  const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {  
  for (let index = 0; index < fileUpload.files.length; index++)  
  {  
   const file = fileUpload.files[index];  
   this.files.push({ data: file, inProgress: false, progress: 0});  
   console.log(this.files)
  }  
    this.uploadFiles();  
  };  
  fileUpload.click();  
}
  deleteFile(name:any){
    let fileIndex = this.files.findIndex(x => x.name === name);
    this.files.splice(fileIndex,1);
    this.storeAttachedFile.splice(fileIndex,1);
    if(this.attachmentList.length === 0){
    this.sendFile.file='';
    }
  }

}
