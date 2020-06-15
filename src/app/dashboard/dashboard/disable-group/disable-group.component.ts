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
  constructor(
    public dialogRef: MatDialogRef<DisableGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any
  ) { }
  

  ngOnInit(): void {
    this.getData = this.data;
    if(this.data){
      this.showEnableGroup = true;
    }else{
      this.showEnableGroup =false;
    }
  }
  cancel(){
    this.dialogRef.close('no');
  }
  yes(){
    this.dialogRef.close('yes')
  }

}
