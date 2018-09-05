import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS, Api_Urls } from './interface';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class AddstockadjustmentService {

  constructor(private http: HttpClient) { }
    

  public getsawarehouse():Observable<any>{
    return this.http.get(APP_SETTINGS.base_url + '/api/TransferOrder/GetSAWarehouses?UserId=1', httpOptions)

  }
  public getallsaitems(data):Observable<any>{
    console.log(data,"daa")
    return this.http.post(APP_SETTINGS.base_url + Api_Urls.GetAllSaItems,data, httpOptions)

  }
  public createsa(data):Observable<any>{
    return this.http.post(APP_SETTINGS.base_url + Api_Urls.CreateSA,data, httpOptions)

  }
}
