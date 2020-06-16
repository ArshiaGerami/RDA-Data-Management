import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-disable-group',
  templateUrl: './disable-group.component.html',
  styleUrls: ['./disable-group.component.scss']
})
export class DisableGroupComponent implements OnInit {
  public getData:any={};
  public showEnableGroup= false;
  public showDisableUser = false;
  public showDisableGroup = false;
  public showEanbleUser = false;
  public getUserName='';
  public groupName =''
  constructor(
    public dialogRef: MatDialogRef<DisableGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  

  ngOnInit(): void {
    this.getData = this.data;
    this.groupName = this.getData.title
    if(this.data.enable && !this.data.user && !this.data.enableUser){
      this.showEnableGroup = true;
      this.showDisableUser =false;
      this.showDisableGroup = false;
      this.showEanbleUser = false;
    }
    if(this.data.user && !this.data.enable && !this.data.enableUser){
      this.getUserName = this.data.user;
      this.showDisableUser = true;
      this.showEnableGroup = false;
      this.showDisableGroup = false;
      this.showEanbleUser = false;
    }
    if(!this.data.enable && ! this.data.user && !this.data.enableUser){
      this.showEnableGroup =false;
      this.showDisableUser = false;
      this.showDisableGroup = true;
      this.showEanbleUser = false;
    }
    if(this.data.enableUser && !this.data.enable && ! this.data.user){
      this.getUserName = this.data.enableUser;
      this.showEnableGroup =false;
      this.showDisableUser = false;
      this.showDisableGroup = false;
      this.showEanbleUser = true;
    }
  }
  cancel(){
    this.dialogRef.close('no');
  }
  yes(){
    this.dialogRef.close('yes')
  }

}
