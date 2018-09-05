import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class TransferOrderService {

  constructor(private http: HttpClient) { }

  public getTranferOrder(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/GetTransferOrderList', data, httpOptions);
  }

}
