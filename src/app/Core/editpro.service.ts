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
export class EditproService {

  constructor(private http: HttpClient) { }
  public getprodetail(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/GetPRODetail',data, httpOptions);
  }
  public addproitem(data): Observable<any> {
    console.log(data,"ja ye rha for add");
    return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/InsertPROItems',data, httpOptions);
  }
  public updateprodetail(data): Observable<any> {
    console.log(data,"ja ye rha update");
    return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/UpdatePROItems',data, httpOptions);
  }
  public deletepodetail(data): Observable<any> {
    //
    console.log(data,"ja ye rha for delete");
    return this.http.post(APP_SETTINGS.base_url + '/api/Inbound/DeletePOItem', data, httpOptions);
  }
  public releaseprodetail(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/ReleasePurchaseReturn', data, httpOptions);
  }
}
