import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../../../integration/login/login.service';
import { FileUploadService } from '../../../integration/fileUpload/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
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
  public pageSize = 1000;
  public groupList: any = [];
  public getName: any = {};
  public filterGroupList: any = [];
  public getRoleAndGroup: any = {};
  public control = new FormControl()


  constructor(
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loginService: LoginService,
    private constant: FileUploadService,
    private matSnackBar: MatSnackBar,
  ) { }

    openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
      panelClass: ['matSnackBar']
    });
  }

  ngOnInit(): void {
    this.getAllGroup(this.pageNumber, this.pageSize);
    this.relations.push(this.fb.group({
      role: new FormControl(),
      group: new FormControl(''),
    }))
  }
  getAllGroup(pageNumber, pageSize) {
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = pageNumber;
    this.page.per_page = pageSize;
    this.loginService.getGroup(this.page, this.getSetHeader).toPromise().then((data: any) => {
      this.groupList = data.data;
      this.filterGroupList = data.data
    });
  }
  filterGroup(value:string){
    if (value) {
      this.getSetHeader = this.constant.addAutherization();
      this.page.page = this.pageNumber;
      this.page.per_page = this.pageSize;
      this.page.query = value
      this.loginService.getFilterGroup(this.page, this.getSetHeader).toPromise().then((data: any) => {
      this.groupList = data.data;
      });
    } else {
       this.getAllGroup(this.pageNumber, this.pageSize)
    }
  }
  passwordSuperAdminEyes(newValue: boolean) {
    this.checkPassword = this.checkPassword !== newValue;
  }
  formGroup = this.fb.group({
    item: this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      relations: new FormArray([])
    })
  })
  get parrentNew(){
    return this.formGroup.controls
  }
  get items(){
      return this.parrentNew.item
  }
  get relations(){
    return this.items.get('relations') as FormArray;   
  }
  addNewGroupAndRole(){
    this.relations.push(this.fb.group({
      role: new FormControl(),
      group: new FormControl(''),
    }))
  }

  AutoCompleteDisplay(item: any) {
    if (item) {
      return item.title;
    }
  }
  cancel() {
    this.dialogRef.close();
  }
  create() {
    this.dialogRef.close('yes')
    this.getSetHeader = this.constant.addAutherization();
    this.loginService.createNewUser(this.formGroup.value, this.getSetHeader).toPromise().then(data => {
      this.openSnackBar("User has been created successfully ", "");
    }, error => { 
      this.openSnackBar("Some thing wrong please try again later", "");
    });
  }

}
