import { Component, PLATFORM_ID, OnInit, Inject } from '@angular/core';
import { LoginService } from '../../integration/login/login.service';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';
import { Router } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatSnackBar } from'@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public url = "";
  public profile: any = {};
  public email: '';
  public userName: '';
  public dashboard = '';
  public token = '';

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private fileUploadService: FileUploadService,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private matSnackBar : MatSnackBar) { }

    openSnackBar(message:string, action:string){
      this.matSnackBar.open(message, action,{
        duration:5000,
        verticalPosition:"top",
        panelClass:['matSnackBar']
      });
    }

  ngOnInit(): void {
    this.token = localStorage.getItem('jwt-token');
    this.dashboard = localStorage.getItem('dashboard');
    const getEmail = JSON.parse(localStorage.getItem('user'));
    this.email = getEmail.email;
    this.userName = getEmail.name;
    this.profile.id = getEmail.id;
    this.profile.email = this.email;
    this.profile.name = this.userName;
    this.profile.status = 'true';
  }
  selectFile(event: any) {
    this.fileUploadService.uploadImage(event).subscribe((img: any) => {
      if (img) {
        this.url = img;
        this.profile.avatar = img;
      } else {
        this.openSnackBar('Please select JPG or PNG file','')
      }
    })
  }
  submitChanges() {
    const headers = new HttpHeaders().set('Authorization', this.token).set('x-access-token', this.token)
    .set('X-Requested-With','XMLHttpRequest')
    const setHeaders = {
      headers: headers
    }
    this.loginService.userInfromation(this.profile, setHeaders).toPromise().then(data => {
      console.log(data);
    })
  }
  cancel() {
    this.route.navigate([this.dashboard]);
  }

}
