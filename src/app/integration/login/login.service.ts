import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { 
  Group, 
  GroupDisable, 
  CreateGroup, 
  UpdateGroup,
  FileArray
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
      per_page: group.per_page
    }
    return this.http.post(environment.host + '/group/get',body, setHeaders);
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
  getUser(group:Group, setHeaders){
      const body: Group ={
        page: group.page,
        per_page: group.per_page
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
      files:fileArray.files,
      userId:fileArray.userId,
      query:fileArray.query
    }
    console.log(body);
    return this.http.post(environment.host + '/file/uploads',body, setHeaders)
  }
}
