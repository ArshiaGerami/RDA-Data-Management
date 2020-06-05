import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { Login } from './login.model';

export interface JWT {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient) {}

  //login
  userInfromation(login: Login, setHeaders) {
    const body: Login = {
      id: login.id,
      name: login.name,
      email: login.email,
      avatar: login.avatar,
      status: login.status,
    }
    return this.http.put(environment.host + '/user/update', body, setHeaders)
  }
}
