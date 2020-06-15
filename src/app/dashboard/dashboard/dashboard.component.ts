import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {
  faChartLine,
  faUsers,
  faLayerGroup,
  faEye,
  faEyeSlash,
  faTrash,
  faEdit,
  faMinusCircle,
  faCheckCircle,
  faUserTimes,
  faUserEdit,
  faUserAltSlash,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoginService } from '../../integration/login/login.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteGroupComponent } from './delete-group/delete-group.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { DisableGroupComponent } from './disable-group/disable-group.component';
import { FileUploadService } from '../../integration/fileUpload/file-upload.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  faChartLine = faChartLine;
  faUsers = faUsers;
  faLayerGroup = faLayerGroup;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faTrash = faTrash;
  faEdit = faEdit;
  faMinusCircle = faMinusCircle;
  faCheckCircle = faCheckCircle;
  faUserTimes = faUserTimes;
  faUserEdit = faUserEdit;
  faUserAltSlash = faUserAltSlash;
  faUser = faUser;
  public showDashboardList = true;
  public showUserList = false;
  public showGroupList = false;
  public groupList: any = [];
  public token = '';
  public getDashboardData: any = {};
  public groupId: any = {};
  public length = 0;
  public pageNumber = 0;
  public pageSize = 10;
  public page: any = {};
  public userList: any = [];
  public getSetHeader: any = {};
  public getIdForDisableAndEnbaleGroup: any = {};
  public commentGroup = false;
  public getGroupItem: any = {};
  displayedColumns: string[] = ['no', 'id', 'name', 'status', 'createdAt', 'action'];
  displayedUserColumns: string[] = ['no', 'id', 'name', 'email', 'role', 'createdAt', 'action']
  dataSource;
  userSource;

  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    private loginService: LoginService,
    private detectChange: ChangeDetectorRef,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private constant: FileUploadService,

  ) { }

  openSnackBar(message: string, action: string) {
    this.matSnackBar.open(message, action, {
      duration: 5000,
      verticalPosition: "top",
      panelClass: ['matSnackBar']
    });
  }

  ngOnInit(): void {
    this.token = localStorage.getItem('jwt-token');
    this.getAllGroups(this.pageNumber, this.pageSize)
    this.getAllUser(this.pageNumber, this.pageSize);
  }

  showDashboard() {
    this.showDashboardList = true;
    this.showUserList = false;
    this.showGroupList = false;
  }
  showUser() {
    this.showDashboardList = false;
    this.showUserList = true;
    this.showGroupList = false;
  }
  showGroup() {
    this.showDashboardList = false;
    this.showUserList = false;
    this.showGroupList = true;
  }
  getAllGroups(pageNumber, pageSize) {
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = pageNumber;
    this.page.per_page = pageSize;
    this.loginService.getGroup(this.page, this.getSetHeader).toPromise().then((data: any) => {
      this.groupList = data.data;
      this.length = this.groupList.length;
      this.dataSource = new MatTableDataSource(this.groupList);
      this.dataSource.sort = this.sort;
      //   this.dataSource.paginator = this.paginator;
      // this.detectChange.detectChanges;
    })
  }

  filter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    setTimeout(() => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }
  addNewUser() {
    const dialog = this.matDialog.open(AddNewUserComponent, {
      width: '800px',
      height: 'auto',
      panelClass:'customDialog'
    });
    dialog.afterClosed().subscribe(result => {

    });
  }
  getAllUser(pageNumber, pageSize) {
    this.getSetHeader = this.constant.addAutherization();
    this.page.page = pageNumber;
    this.page.per_page = pageSize;
    this.loginService.getUser(this.page, this.getSetHeader).toPromise().then(data => {
      this.userList = data
      this.length = this.userList.total;
      this.userSource = new MatTableDataSource(this.userList.data);
      this.userSource.sort = this.sort;
    })
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
        this.loginService.addGroup(this.getGroupItem, this.getSetHeader).toPromise().then(data => {
          this.openSnackBar("Group successfully has been created", "")
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize)
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "")
        });
      }
    });
  }
  deleteGroup(id: string) {
    const dialog = this.matDialog.open(DeleteGroupComponent, {
      width: '400px',
      height: '150px',
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.loginService.deleteGroup(id).toPromise().then(data => {
          this.openSnackBar("Group successfully has been deleted", "")
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize)
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "")
        });
      }
    })
  }
  disableGroup(id: string, title:string) {
    const dialog = this.matDialog.open(DisableGroupComponent, {
      width: '550px',
      height: '150px',
      data:{title}
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.getIdForDisableAndEnbaleGroup.id = id
        this.getSetHeader = this.constant.addAutherization();
        this.loginService.disableGroup(this.getIdForDisableAndEnbaleGroup, this.getSetHeader).toPromise().then(data => {
          this.openSnackBar("Group successfully has been disabled", "");
          setTimeout(() => {
            this.getAllGroups(this.pageNumber, this.pageSize)
          }, 500)
        }, error => {
          this.openSnackBar("Some thing wrong please try again later", "")
        });
      }
    })
  }
  enableGroup(id: string, title:string) {
    const dialog = this.matDialog.open(DisableGroupComponent, {
      width: '550px',
      height: '150px',
      data:{enable: 'yes', title}
    });
    dialog.afterClosed().subscribe(result => {
      if (result === 'yes') {
        this.getSetHeader = this.constant.addAutherization();
        this.getIdForDisableAndEnbaleGroup.id = id
        this.loginService.disableGroup(this.getIdForDisableAndEnbaleGroup, this.getSetHeader).toPromise()
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
  updateGroup(id:string, title:string){
    const dialog = this.matDialog.open(AddGroupComponent, {
      width: '400px',
      height: 'auto',
      data:{update:'yes', title},
    });
    dialog.afterClosed().subscribe(result => {
      if(result !=='no'){
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
