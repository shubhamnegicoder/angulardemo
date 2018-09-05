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
export class StateService {

  constructor(private httpService: HttpClient) { }

 
  public getStateList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Region/GetRegionList', data, httpOptions);
  }

  //api for brand creation

  public createState(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Region/Save', data, httpOptions);
  }

  // api for editing brands

  public updateState(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Region/Save', data, httpOptions);
  }

    // api for changing status 

    public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Region/ChangeStatus',data, httpOptions);
    }

}
