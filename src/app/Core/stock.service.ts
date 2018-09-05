import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(private http: HttpClient) { }


  public getStockMaintainList(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Stock/GetStockList',data , httpOptions);
  }

  GetWarehouseByCity

  public getWarehouseList(userId,cityId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Warehouse/GetWarehouseByCity?UserId='+userId+'&CityId='+cityId , httpOptions);
  }
}
