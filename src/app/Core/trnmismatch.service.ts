import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

@Injectable({
  providedIn: 'root'
})
export class TrnmismatchService { 

  constructor(private http: HttpClient) {} 
  

  public getTRNLocations(data): Observable<any> { 
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetTRNLocations', data , httpOptions);
 
  } 
  public getList(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetTRNMismatchList', data , httpOptions);
  }

  getOneTrnMismatch(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetById', data , httpOptions);
  }

  releasedTrnMismatch(data): Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/ReleaseTRNMismatch', data , httpOptions);
  }
}
