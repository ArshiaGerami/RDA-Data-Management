import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginService } from '../../../integration/login/login.service';
import { FileUploadService} from '../../../integration/fileUpload/file-upload.service';
@Component({
  selector: 'app-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  public checkPassword = true;
  public addUser: any = {};
  public getSetHeader: any = {};
  public page: any = {};
  public pageNumber = 0;
  public pageSize = 15;
  public groupList: any = [];
  public getName:any={};
  public filterGroupList:any=[];
  public getRoleAndGroup:any={};

  constructor(
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loginService : LoginService,
    private constant: FileUploadService
  ) { }

  ngOnInit(): void {
    this.getAllGroup(this.pageNumber, this.pageSize);
  }
  getAllGroup(pageNumber, pageSize){
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = pageNumber;
    this.page.per_page = pageSize;
    this.loginService.getGroup(this.page, this.getSetHeader).toPromise().then((data: any) => {
      this.groupList = data.data;
      this.filterGroupList = data.data
    });
  }
  filterGroup(value:string){
    if(value){
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = this.pageNumber;
    this.page.per_page = this.pageSize;
    this.page.query = value;
    this.loginService.getFilterGroup(this.page, this.getSetHeader).toPromise().then(data => {
        this.groupList = data;
        console.log(this.groupList);
    });
    }
  }
  passwordSuperAdminEyes(newValue: boolean) {
    this.checkPassword = this.checkPassword !== newValue;
  }
  item = this.fb.group({
    // item: this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],

      relations: this.fb.array([
       this.fb.control('')
      ])
    // })
  })
  cancel() {
    this.dialogRef.close();
  }
  create() {
    console.log(this.item.value);
  }
  get relations(){
    return this.item.get('relations') as FormArray;
  }
  addNewGroupAndRole(){
    this.relations.push(this.fb.control(''));
  }
}
