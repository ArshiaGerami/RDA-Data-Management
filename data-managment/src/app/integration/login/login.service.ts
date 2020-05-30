import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Login } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor( private http: HttpClient) { }

  //login
  // userLogin(login: Login) {
  //   const body: Login = {
  //     email: login.email,
  //     password: login.password,
  //   };
  //   return this.http.post(environment.host + 'login',body)
  // }
}
