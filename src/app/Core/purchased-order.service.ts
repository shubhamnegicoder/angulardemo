import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PurchasedOrderService {

  constructor(private http: HttpClient) { }

  public getSearchData(): Observable<any>
  {
    return this.http.get(APP_SETTINGS.base_url + 'api/Inbound/GetIBListSearchDetails', httpOptions);
  }

  public getSearchCities(stateId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/City/GetCitiesByState?StateId=' + stateId, httpOptions);
  }

  public getRegionList(CountryId,userId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Region/GetRegionByCountry?UserId='+userId+'&CountryId='+CountryId, httpOptions);
  }
  public getSearchVendors(cityId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Inbound/GetVendorWHByCity?CityId=' + cityId, httpOptions);
  }

  public getpurchasedList(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Inbound/GetPurchaseOrderList',data , httpOptions);
  }

  
}
