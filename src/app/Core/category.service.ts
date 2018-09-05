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
export class CategoryService {

  constructor(private httpService: HttpClient) { } 

 
  public getCategoryList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Category/GetCategoryList', data, httpOptions);
  }

  
  public createCategory(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Category/Save', data, httpOptions);
  }

  // api for editing brands

  public updateCategory(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Category/Save', data, httpOptions);
  }

  public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Category/ChangeStatus',data, httpOptions);
  }
  
  public getAllCategory(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Category/GetAll', data, httpOptions); 
  }
}
