import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';

@Component({
  selector: 'app-switch-account',
  templateUrl: './switch-account.component.html',
  styleUrls: ['./switch-account.component.scss']
})
export class SwitchAccountComponent implements OnInit {
  public relation:any=[];
  public userName:'';

  constructor(
    private router: Router,
    private switchAccount: FileUploadService
  ) { }

  ngOnInit(): void {
    this.relation =JSON.parse( localStorage.getItem('relations'));
    const getUser =JSON.parse(localStorage.getItem('user'));
    this.userName = getUser.name;
  }
  gotoAccount(any:string, id:string){
   this.switchAccount.switchAccount(any,id, this.userName)
  }
  
}
