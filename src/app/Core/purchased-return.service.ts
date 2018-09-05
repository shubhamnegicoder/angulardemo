import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class PurchasedReturnService {

  constructor(private http: HttpClient) { }

  public getListData(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Outbound/GetPurchaseReturnList',data, httpOptions);
  }



}
