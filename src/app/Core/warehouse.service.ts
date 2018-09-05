import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { APP_SETTINGS } from './interface';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {

  constructor(private http: HttpClient) { }

  

  public getWareHouseList(): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Warehouse/GetWarehouseByUserId' , httpOptions);
  }

  public getFilteredData(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/Warehouse/GetWarehouseSeacrh',data , httpOptions);
  }
  public addwarehouse(data):Observable<any>{

    return this.http.post(APP_SETTINGS.base_url+'api/Warehouse/Save',data,httpOptions)
  }
  public warehousecountry(data):Observable<any>{

    return this.http.post(APP_SETTINGS.base_url+'/api/Country/GetAllCountry',data,httpOptions);
  }
  public warehousestate(userid,countryid):Observable<any>{

    return this.http.get(APP_SETTINGS.base_url+'/api/Region/GetRegionByCountry?UserId='+userid+'&CountryId='+countryid,httpOptions);
  }
  
  public warehousecity(userid,stateid):Observable<any>{
    return this.http.get(APP_SETTINGS.base_url+'/api/City/GetCitiesByState?UserId='+userid+'&StateId='+stateid,httpOptions);
  }
  public getwarehousebyid(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url+'/api/Warehouse/GetById',data,httpOptions);
  }
  public updatewarehousebyid(data):Observable<any>{
    return this.http.put(APP_SETTINGS.base_url+'/api/Warehouse/Save',data,httpOptions);
  }
  

  //

  public changeStatus(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Warehouse/ChangeStatus',data, httpOptions);
  }
}
