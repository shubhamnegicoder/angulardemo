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
export class ProductTypeService {

  constructor(private httpService: HttpClient) { }

 
  public getProductTypeList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/ProductType/GetProductTypeList', data, httpOptions);
  }

  //api for ProductType creation

  public createProductType(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/ProductType/Save', data, httpOptions);
  }

  // api for ProductType brands

  public updateProductType(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/ProductType/Save', data, httpOptions);
  }

       // api for changing status 
       public changeStatus(data): Observable<any> {
        return this.httpService.post(APP_SETTINGS.base_url + 'api/ProductType/ChangeStatus',data, httpOptions);
      }
}
