import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { ProfileUpdate } from '../profile/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }
  userInfromation(profileUpdate: ProfileUpdate, setHeaders) {
    const body: ProfileUpdate = {
      item:profileUpdate.item,
  }
    return this.http.put(environment.host + '/user/update', body, setHeaders)
  }
}
