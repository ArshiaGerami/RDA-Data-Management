import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';
import { DisableGroupComponent } from '../../dashboard/dashboard/disable-group/disable-group.component';
import { MatTableDataSource } from '@angular/material/table';
import { LoginService } from '../../integration/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { AddGroupComponent } from '../../dashboard/dashboard/add-group/add-group.component';
import { DeleteGroupComponent } from '../../dashboard/dashboard/delete-group/delete-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  faTrash,
  faMinusCircle,
  faCheckCircle,
  faEdit
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public getSetHeader: any = {};
  public pageNumber = 0;
  public pageSize = 10;
  public page: any = {};
  public getIdForDisableAndEnableGroup: any = {};
  public groupList: any = [];
  public length = 0;
  public getGroupItem: any = {};
  public groupId:any={}
  faTrash = faTrash;
  faMinusCircle = faMinusCircle;
  faCheckCircle = faCheckCircle;
  faEdit = faEdit;

  displayedColumns: string[] = ['no', 'id', 'name', 'status', 'createdAt', 'action'];
  dataSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private constant: FileUploadService,
    private loginService: LoginService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private route: ActivatedRoute
  ) { }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
      panelClass: ['matSnackBar']
    });
  }


  ngOnInit(): void {
    this.groupId = this.route.params.subscribe( params =>{
        this.page.groupId = params['groupId']
    })
    this.getAllGroups(this.pageNumber, this.pageSize)
  }

  getAllGroups(pageNumber, pageSize) {
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = pageNumber;
    this.page.per_page = pageSize;
    this.loginService.getGroup(this.page, this.getSetHeader).toPromise().then((data: any) => {
      this.groupList = data;
      this.length = this.groupList.total;
      this.dataSource = new MatTableDataSource(this.groupList.data);
      this.dataSource.sort = this.sort;
    })
  }

  filter(filterValue: any) {
    if(filterValue){
    this.getSetHeader = this.constant.addAutherization();
    this.page.pageNumber = this.pageNumber;
    this.page.pageSize = this.pageSize;
    this.page.query = filterValue.trim().toLowerCase();
    this.page.groupId =''
    this.loginService.getFilterGroup(this.page, this.getSetHeader).toPromise().then(res => {
      this.groupList = res
      this.dataSource = new MatTableDataSource(this.groupList.data);
      setTimeout(() => {
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
    })
  }else{
    this.getAllGroups(this.pageNumber, this.pageSize)
  }
  
  }
  addGroup() {
    const dialog = this.matDialog.open(AddGroupComponent, {
      width: '400px',
      height: 'auto',
    });
    dialog.afterClosed().subscribe(result => {
      if (result !== 'no') {
        this.getSetHeader = this.constant.addAutherization();
        this.getGroupItem.item = result;
        this.getGroupItem.item.groupId = this.page.groupId
        this.loginService.addGroup(this.getGroupItem, this.getSetHeader).toPromise().then(data => {
          this.openSnackBar("Group successfully has been created", "")
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize);
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "");
        });
      }
    });
  }
  deleteGroup(id: string, title: string) {
    const dialog = this.matDialog.open(DeleteGroupComponent, {
      width: '550px',
      height: '150px',
      data: { title: title }
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.loginService.deleteGroup(id).toPromise().then(data => {
          this.openSnackBar("Group successfully has been deleted", "");
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize);
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "");
        });
      }
    })
  }
  disableGroup(id: string, title: string) {
    const dialog = this.matDialog.open(DisableGroupComponent, {
      width: '550px',
      height: '150px',
      data: { title }
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.getIdForDisableAndEnableGroup.id = id
        this.getSetHeader = this.constant.addAutherization();
        this.loginService.disableGroup(this.getIdForDisableAndEnableGroup, this.getSetHeader).toPromise().then(data => {
          this.openSnackBar("Group successfully has been disabled", "");
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize);
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "");
        });
      }
    })
  }
  enableGroup(id: string, title: string) {
    const dialog = this.matDialog.open(DisableGroupComponent, {
      width: '550px',
      height: '150px',
      data: { enable: 'yes', title }
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.getSetHeader = this.constant.addAutherization();
        this.getIdForDisableAndEnableGroup.id = id
        this.loginService.disableGroup(this.getIdForDisableAndEnableGroup, this.getSetHeader).toPromise()
          .then(data => {
            this.openSnackBar("Group successfully has been enabled", "");
            setTimeout(() => {
              this.getAllGroups(this.pageNumber, this.pageSize)
            }, 500)
          }, error => {
            this.openSnackBar("Some thing wrong please try again later", "");
          });
      }
    })
  }
  updateGroup(id: string, title: string) {
    const dialog = this.matDialog.open(AddGroupComponent, {
      width: '400px',
      height: 'auto',
      data: { update: 'yes', title },
    });
    dialog.afterClosed().subscribe(result => {
      if (result !== 'no') {
        this.getSetHeader = this.constant.addAutherization();
        this.getGroupItem.item = result;
        this.getGroupItem.item.id = id;
        this.loginService.updateGroup(this.getGroupItem, this.getSetHeader).toPromise()
          .then(data => {
            this.openSnackBar("Group successfully has been updated", "");
            setTimeout(() => {
              this.getAllGroups(this.pageNumber, this.pageSize)
            }, 500)
          }, error => {
            this.openSnackBar("Some thing wrong please try again later", "")
          });
      }
    });
  }
}
