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
export class EditpoService {

  constructor(private http: HttpClient) { }
  public getpodetail(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Inbound/GetPurchaseOrderDetail',data, httpOptions);
  }
  public addpoitem(data): Observable<any> {
    console.log(data,"ja ye rha for add");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/InsertPOItems',data, httpOptions);
  }
  public updatepodetail(data): Observable<any> {
    console.log(data,"ja ye rha");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/UpdatePOItems',data, httpOptions);
  }
  public deletepodetail(data): Observable<any> {
    //
    console.log(data,"ja ye rha for delete");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/DeletePOItem',data, httpOptions);
  }
  public canclepodetail(data): Observable<any> {
    //
    console.log(data,"ja ye rha for cancle");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/CancelPO',data, httpOptions);
  }
}
