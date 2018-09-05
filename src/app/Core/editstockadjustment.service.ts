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
export class EditstockadjustmentService {

  constructor(private http: HttpClient) { }


  public getsadetail(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + '/api/TransferOrder/GetSADetail',data, httpOptions)
  }
  public updatesa(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/UpdateTO',data, httpOptions)
  }
  public insertsaitems(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/InsertTOItems',data, httpOptions)
  }
  public deletesaitems(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/DeleteTOI',data, httpOptions)
  }
  public releasesa(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferOrder/ReleaseSA',data, httpOptions)
  }
}
