import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { 
  Group, 
  GroupDisable, 
  CreateGroup, 
  UpdateGroup,
  FileArray,
  GroupFilter,
  UserFilter,
  CreateUser,
  ChangePassword,
  UpdateUser,
  User,
 } from './login.model';

export interface JWT {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token = '';
  
  constructor(
    private http: HttpClient) {}

  getGroup(group: Group , setHeaders){
    const body: Group={
      page: group.page,
      per_page: group.per_page,
      groupId: group.groupId
    }
    return this.http.post(environment.host + '/group/get',body, setHeaders);
  }
  getFilterGroup(groupFilter: GroupFilter , setHeaders){
    const body: GroupFilter={
      page: groupFilter.page,
      per_page: groupFilter.per_page,
      query: groupFilter.query,
      groupId: groupFilter.groupId,
    }
    return this.http.post(environment.host + '/group/getFilter',body, setHeaders);
  }
  getUserFilter(userFilter: UserFilter , setHeaders){
    const body: UserFilter={
      page: userFilter.page,
      per_page: userFilter.per_page,
      query: userFilter.query
    }
    return this.http.post(environment.host + '/user/getFilter',body, setHeaders);
  }
  deleteGroup(id:string){
    this.token = localStorage.getItem('jwt-token');
    const options ={
      headers: new HttpHeaders().set('Authorization', this.token).set('x-access-token', this.token)
      .set('X-Requested-With','XMLHttpRequest'),
      body:{
        id:id
      }
    }
     return this.http.delete(environment.host + '/group/delete',options)
  }
  getUser(user:User, setHeaders){
      const body: User ={
        page: user.page,
        per_page: user.per_page
      }
    return this.http.post(environment.host + '/user/get', body, setHeaders)
  }
  addGroup(createGroup: CreateGroup, setHeaders){
    const body: CreateGroup ={
      item: createGroup.item,
    }
    return this.http.post(environment.host + '/group/create',body, setHeaders);
  }
  disableGroup(groupDisable : GroupDisable, setHeaders){
    const body: GroupDisable ={
      id: groupDisable.id,
    }
    return this.http.put(environment.host + '/group/changeStatus',body , setHeaders)
  }
  updateGroup(updateGroup: UpdateGroup, setHeaders){
    const body : UpdateGroup ={
      item: updateGroup.item,
    }
    return this.http.put(environment.host + '/group/update', body, setHeaders);
  }
  deleteUser(id: string){
    this.token = localStorage.getItem('jwt-token');
    const options ={
      headers: new HttpHeaders().set('Authorization', this.token).set('x-access-token', this.token)
      .set('X-Requested-With','XMLHttpRequest'),
      body:{
        id:id
      }
    }
     return this.http.delete(environment.host + '/user/delete',options)
  }
  disableUser(groupDisable : GroupDisable, setHeaders){
    const body: GroupDisable ={
      id: groupDisable.id,
    }
    return this.http.put(environment.host + '/user/changeStatus',body , setHeaders)
  }
  uploadFile(fileArray: FileArray, setHeaders){
    const body : FileArray ={
      file:fileArray.file,
      userId:fileArray.userId,
      groupId:fileArray.groupId
    }
    return this.http.post(environment.host + '/file/uploads',body, setHeaders)
  }
  createNewUser(createUser: CreateUser, setHeaders){
    const body: CreateUser={
      item: createUser.item,
    }
    return this.http.post(environment.host + '/user/create',body , setHeaders)
  }
  updateUsers(updateUser: UpdateUser, setHeaders){
    const body: UpdateUser={
      item:updateUser.item,
    }
    return this.http.put(environment.host + '/user/update',body, setHeaders)
  }
  changePass(changePassword : ChangePassword, setHeaders){
    const body: ChangePassword={
      id: changePassword.id,
      confirmedPassword: changePassword.confirmedPassword,
      currentPassword: changePassword.currentPassword,
      newPassword: changePassword.newPassword
    }
    return this.http.put(environment.host + '/user/changePassword',body, setHeaders)
  }
}
