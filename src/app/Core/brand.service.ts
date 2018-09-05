import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS, Api_Urls } from './interface';
import { RequestOptions } from '@angular/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpService: HttpClient) { }


  public getBrandList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + Api_Urls.GetBrandList, data, httpOptions);
  }

  //api for brand creation

  public createBrands(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + Api_Urls.CreateBrand, data, httpOptions);
  }

  // api for editing brands

  public updateBrand(data): Observable<any> {
    return this.httpService.put(APP_SETTINGS.base_url + Api_Urls.CreateBrand, data, httpOptions);
  }

  // api for changing status 

  public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + Api_Urls.changeBrandStatus,data, httpOptions);
  }

  public getAllBrand(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + Api_Urls.GetAllBrands, data, httpOptions); 
  }

}
