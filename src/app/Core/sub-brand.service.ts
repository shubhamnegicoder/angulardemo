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
export class SubBrandService {

  constructor(private httpService: HttpClient) { }

 
  public getSubBrandList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubBrand/GetSubBrandList', data, httpOptions);
  }

  public getAllBrandList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Brand/GetAll', data, httpOptions);
  }

   //api for SubBrand creation

   public createSubBrand(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubBrand/Save', data, httpOptions);
  }

  // api for SubBrand brands

  public updateSubBrand(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/SubBrand/Save', data, httpOptions);
  }

   // api for changing status 

   public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubBrand/ChangeStatus',data, httpOptions);
  }

  public findSubBrand(data): Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubBrand/GetByParentId',data, httpOptions); 
  }
}
