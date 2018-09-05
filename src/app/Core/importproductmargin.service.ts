import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ImportproductmarginService {

  constructor(private http: HttpClient) { }


  public  getcategoryall(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + 'api/Category/GetAll',data, httpOptions)
  }
  public  getsubcategoryall(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + 'api/SubCategory/GetByParentId',data, httpOptions)
  }
  public  getbrandall(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + 'api/Brand/GetAll',data, httpOptions)
  }
  public  getsubbrandall(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + 'api/SubBrand/GetByParentId',data, httpOptions)
  }
  public  getitemlist(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + 'api/ItemMargin/GetItemByCategoryBrand',data, httpOptions)
  }
  public exportitem(data):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url + '/api/ItemMargin/ExportItemMargin',data, httpOptions)
  }
}
