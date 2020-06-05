import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() { }

  public uploadImage(event):any{
    const file = event.target.files[0];
    if(file.type === "image/png" || file.type === "image/jpeg"){
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return Observable.create(observer => {
        reader.onloadend = () => {
          observer.next(reader.result);
          observer.complete();
        }
      });
    }else{
      return Observable.create(observer => {
        observer.next(null);
        observer.complete();
      })
    }
  }
}
