import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  public groupName:any={};
  public getData:any={};
  public showEditGroup = false;
  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.getData = this.data;
    if(this.getData){
      this.groupName.title = this.getData.title;
      this.showEditGroup = true;
    }else{
      this.showEditGroup = false;
    }
  }
  cancel(){
    this.dialogRef.close('no');
  }
  create(){
    this.dialogRef.close(this.groupName);
  }
}
