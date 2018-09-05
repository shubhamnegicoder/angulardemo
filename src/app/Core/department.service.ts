import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from './interface';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private httpService: HttpClient) { }

 
  public getDepartmentList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Department/GetDepartmentList', data, httpOptions);
  }

   //api for Department creation

   public createDepartment(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Department/Save', data, httpOptions);
  }

  // api for Department brands

  public updateDepartment(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Department/Save', data, httpOptions);
  }

     // api for changing status 

     public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Department/ChangeStatus',data, httpOptions);
    }
}
