import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockAdjustmentServiceService {

  constructor(private http: HttpClient) { }


  public getStockAdjustmentList(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/GetStockAdjustmentList',data , httpOptions);
  }
}
