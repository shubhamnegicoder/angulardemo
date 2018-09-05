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
export class TaxService {

  constructor(private httpService: HttpClient) { }

 
  public getTaxList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Tax/GetTaxList', data, httpOptions);
  }

  //api for Tax creation

  public createTax(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Tax/Save', data, httpOptions);
  }

  // api for editing Tax

  public updateTax(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Tax/Save', data, httpOptions);
  }

   // api for changing status 

   public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Tax/ChangeStatus',data, httpOptions);
  }
}
