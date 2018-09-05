import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable()
export class GrnService {

  constructor(private http: HttpClient) { }

  getAllGrn(x): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/Inbound/GetGRNList', x, httpOptions);
  }

  getAllStates(stateId) : Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/City/GetCitiesByState?StateId=' + stateId, httpOptions);
  }


  public getSearchVendors(cityId): Observable<any> {

    return this.http.get(APP_SETTINGS.base_url + 'api/Inbound/GetVendorWHByCity?CityId=' + cityId, httpOptions);
  }


  public getSearchData(): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Inbound/GetIBListSearchDetails', httpOptions); 
  }

  public getWarehouseForCreateGrn(): Observable<any>{
    return this.http.get(APP_SETTINGS.base_url + '/api/Warehouse/GetWarehouseByPendingPO?UserId=' + '1' , httpOptions);
  }

  public getVendorForCreateGrn(whId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + '/api/Vendor/GetVendorforPendingPO?WHId=' + whId, httpOptions);
  }

  getOpenPo(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/GetOpenPOList' , data, httpOptions);
  }

  getDataForListInCreateGrn(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/GetPurchaseOrderDetail', data, httpOptions);
  }

  submitData(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/ManageGRNDetails', data, httpOptions);
  }

  getOneGrn(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/GetGRNDetails', data, httpOptions);
  }

  searchedItem(data): Observable<any>{
    return this.http.get(APP_SETTINGS.base_url + '/api/Item/GetSearchedItemList?Name='+data, httpOptions);
  }

  releaseGrn(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/ReleaseGRN',data, httpOptions);
  }

  searchdata(data) : Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/GetAllSearchedGRNItems',data, httpOptions);
  }

  addItemToList(data) : Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/InsertNewGRNDetails',data, httpOptions);
  }
}
