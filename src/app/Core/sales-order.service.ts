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
export class SalesOrderService {

  constructor(private httpService: HttpClient) { }


  public getSalesOrderList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/GetSalesOrderList', data, httpOptions);
  }


  //method to fetch warehouse list for filter

  public getWareHouseList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/GetAllSubInvenotry', data, httpOptions);
  }

  public getCustomerByWarehouse(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/GetCustomerBySubWarehouse', data, httpOptions);
  }

  public searchItem(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/GetAllSearchedSOItems', data, httpOptions);
  }

  public saveSOItems(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/InsertSOItems', data, httpOptions);
  }

  public createSO(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/CreateSO', data, httpOptions);
  }

  public soById(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/GetSODetail', data, httpOptions);
  }

  public releaseSo(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SalesOrder/ReleaseSO', data, httpOptions);
  }
}
