import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LoginService } from '../../../integration/login/login.service';
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
  constructor(
    public dialogRef: MatDialogRef<AddNewUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private loginService : LoginService,
  ) { }

  ngOnInit(): void {
  }
  getGroups(){
    
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
