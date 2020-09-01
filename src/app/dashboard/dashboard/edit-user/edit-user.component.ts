import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormArray, FormControl } from '@angular/forms';
import { LoginService } from '../../../integration/login/login.service';
import { FileUploadService } from '../../../integration/fileUpload/file-upload.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public getSetHeader: any = {};
  public page: any = {};
  public pageNumber = 0;
  public pageSize = 1000;
  public groupList: any = [];
  public getUserId: any = {};
  public getUserName: any = {};
  public getUserEmail: any = {};
  public getGroupId:any=[];
  public useGroupId:any={};
  public getDataIdGroup:any={};
  public filterGroupList: any = [];
  public getRelations:any=[];
  public checkEachGroupRole:any=[]
  public control = new FormControl()

  constructor(public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder,
    private loginService: LoginService,
    private constant: FileUploadService, ) { }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
      panelClass: ['matSnackBar']
    });
  }

  ngOnInit(): void {
    this.getUserId = this.data.userId;
    this.getUserName = this.data.userName;
    this.getUserEmail = this.data.userEmail;
    this.getRelations = this.data.relations;
    this.getAllGroup(this.pageNumber, this.pageSize);
    this.relations.push(this.fb.group({
      role:new FormControl(''),
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
  filterGroup(value: string) {
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
  formGroup = this.fb.group({
    item: this.fb.group({
      id: '',
      name: '',
      email: '',
      passwrod: '',
      avatar:'',
      relations: new FormArray([])
    })
  })
  get parrentNew() {
    return this.formGroup.controls
  }
  get items() {
    return this.parrentNew.item
  }
  get relations() {
    return this.items.get('relations') as FormArray;
  }
  addNewGroupAndRole() {
    this.relations.push(this.fb.group({
      role: new FormControl(),
      group: new FormControl(''),
    }))
  }

 AutoCompleteDisplay(item: any) {
    return item.title
  }
  cancel() {
    this.dialogRef.close();
  }
  update() {
    this.dialogRef.close('yes')
   this.getGroupId =this.formGroup.controls.item.value.relations;
    for(let i=0; i<= this.getGroupId.length; i++){
      let checkId = this.getGroupId[i].group._id;
      this.useGroupId= checkId;
      break;
    }
    this.formGroup.patchValue({
      item: {
        id: this.getUserId,
        name: this.getUserName,
        email: this.getUserEmail,
        relations:[{
          group: this.useGroupId,
        }]
      }
    })
    this.getSetHeader = this.constant.addAutherization()
    this.loginService.updateUsers(this.formGroup.value, this.getSetHeader).toPromise().then(data => {
      this.openSnackBar('User has been updated','')
    }, error => {
      this.openSnackBar('Something went wrong please try again','')
    })
  }
}
