import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CreatePoService {

  constructor(private http: HttpClient) { }
  public getcity(): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/City/GetWHCities', httpOptions);
  }
  public getwarehouse(data): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + '/api/Inbound/GetVendorWHByCity?CityId='+data, httpOptions)
  }
  public polist(data): Observable<any> {
    
    return this.http.post(APP_SETTINGS.base_url + 'api/Inbound/GetClosedPOList', data, httpOptions);
  }
  public searchpo(data): Observable<any> {
    //  console.log(data, "servicepost")
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/GetAllSearchedPOItems', data, httpOptions);
  }
  public auto(data): Observable<any> {
        return this.http.get(APP_SETTINGS.base_url + '/api/Item/GetSearchedItemList?Name='+data, httpOptions);
  }


  public createPO(data): Observable<any> {
    // console.log(data, "createPo service called")
    return this.http.post(APP_SETTINGS.base_url + 'api/Inbound/CreatePO',data, httpOptions);
  } 

  public vendorDetail(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Vendor/GetVendorDetail',data, httpOptions);
  } 
  public reorderdetail(data): Observable<any> {
    console.log(data,"for reorder");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/ReOrderPO',data, httpOptions);
  } 

}
