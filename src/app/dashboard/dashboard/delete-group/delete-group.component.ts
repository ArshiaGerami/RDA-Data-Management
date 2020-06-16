import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-group',
  templateUrl: './delete-group.component.html',
  styleUrls: ['./delete-group.component.scss']
})
export class DeleteGroupComponent implements OnInit {
  public groupTitle=''
  public getUser=''
  public showDeleteUser= false;
  constructor(
    public dialogRef: MatDialogRef<DeleteGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }

  ngOnInit(): void {
    this.groupTitle = this.data.title;
    this.getUser = this.data.user
    if(this.getUser && !this.groupTitle){
      this.showDeleteUser = true;
    }else{
      this.showDeleteUser = false;
    }
  }
  cancel(){
    this.dialogRef.close('no');
  }
  yes(){
    this.dialogRef.close('yes')
  }
}
