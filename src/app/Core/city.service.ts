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
export class CityService {

  constructor(private httpService: HttpClient) { }

 
  public getCityList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/City/GetCityList', data, httpOptions);
  }

   //api for city creation

   public createCity(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/City/Save', data, httpOptions);
  }

  // // api for editing brands

  public updateCity(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/City/Save', data, httpOptions);
  }

     // api for changing status 

     public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + '/api/City/ChangeStatus',data, httpOptions);
    }
}
