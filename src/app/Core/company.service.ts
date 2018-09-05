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
export class CompanyService {

  constructor(private httpService: HttpClient) { }

 
  public getCompanyList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Company/GetCompanyList', data, httpOptions);
  }

   //api for brand creation

   public createCompany(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Company/Save', data, httpOptions);
  }

  // api for editing brands

  public updateCompany(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Company/Save', data, httpOptions);
  }

   // api for changing status 

   public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Company/ChangeStatus',data, httpOptions);
  }
}
