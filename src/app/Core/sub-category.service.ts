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
export class SubCategoryService {

  constructor(private httpService: HttpClient) { }

 
  public getSubCategoryList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubCategory/GetSubCategoryList', data, httpOptions);
  }

  public getAllCategoryList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Category/GetAll', data, httpOptions);
  }

   //api for SubCategory creation

   public createSubCategory(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubCategory/Save', data, httpOptions);
  }

  // api for SubBrand brands

  public updateSubCategory(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/SubCategory/Save', data, httpOptions);
  }

     // api for changing status 
     public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/SubCategory/ChangeStatus',data, httpOptions);
    }

   public findSubCategory(data): Observable<any>{
     return this.httpService.post(APP_SETTINGS.base_url + 'api/SubCategory/GetByParentId',data, httpOptions);
   }
}
