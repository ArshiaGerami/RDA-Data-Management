import { Component, PLATFORM_ID, OnInit, Inject } from '@angular/core';
import { ProfileService } from '../../integration/profile/profile.service';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public url = "";
  public getProfileItem={
    item:{
      id:'',
      email:'',
      name:'',
      avatar:'',
      relations:[],
      status:'',
    }
  };
  public email: '';
  public userName: '';
  public dashboard = '';
  public token = '';
  public getData: any = {};
  public getSetHeader: any = {};

constructor(
  private profileService: ProfileService,
  private fileUploadService: FileUploadService,
  private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  private matSnackBar: MatSnackBar) { }

openSnackBar(message: string, action: string){
  this.matSnackBar.open(message, action, {
    duration: 5000,
    verticalPosition: "top",
    panelClass: ['matSnackBar']
  });
}

ngOnInit(): void {
  this.token = localStorage.getItem('jwt-token');
  this.dashboard = localStorage.getItem('dashboard');
  this.getData = JSON.parse(localStorage.getItem('user'));
  this.email = this.getData.email;
  this.userName = this.getData.name;
  this.checkProfilePicture();
  this.getProfileItem.item.id = this.getData.id; 
  this.getProfileItem.item.name = this.getData.name;
  this.getProfileItem.item.email = this.getData.email;
  this.getProfileItem.item.relations = this.getData.relations
  this.getProfileItem.item.status = 'true';
}
checkProfilePicture(){
  if(this.getData.avatar){
    this.url ='http://45.77.238.50:4000/'+ this.getData.avatar;
    }
}
selectFile(event: any) {
  this.fileUploadService.uploadImage(event).subscribe((img: any) => {
    if (img) {
      this.url = img;
      this.getProfileItem.item.avatar = img;
    } else {
      this.openSnackBar('Please select JPG or PNG file', '')
    }
  })
}
submitChanges() {
  this.getSetHeader = this.fileUploadService.addAutherization();
  this.profileService.userInfromation(this.getProfileItem, this.getSetHeader).toPromise().then(data => {
    this.openSnackBar('Profile picture has been updated', '')
  },error=>{
    this.openSnackBar('Something went wrong please try again later', '')
  })
}
cancel() {
  this.route.navigate([this.dashboard]);
}

}
