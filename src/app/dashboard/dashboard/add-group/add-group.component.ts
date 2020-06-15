import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent implements OnInit {

  public groupName:any={};

  constructor(
    public dialogRef: MatDialogRef<AddGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
  }
  cancel(){
    this.dialogRef.close('no');
  }
  create(){
    this.dialogRef.close(this.groupName);
  }
}
