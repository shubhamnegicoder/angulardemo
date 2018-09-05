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
export class MarginService {

  constructor(private httpService: HttpClient) { }

  public getItemMarginList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/ItemMargin/GetItemMarginList', data, httpOptions);
  }

   //api for brand creation

   public createItemMargin(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/ItemMargin/Save', data, httpOptions);
  }

  // api for editing brands

  public updateItemMargin(data):Observable<any>{  
    return this.httpService.put(APP_SETTINGS.base_url + 'api/ItemMargin/Save', data, httpOptions);
  }

    // api for changing status 

    public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/ItemMargin/ChangeStatus',data, httpOptions);
    }


    public getItemMarginCityItem(): Observable<any> {
      let data = {
        "userId": "1"
      }
      return this.httpService.post(APP_SETTINGS.base_url + 'api/ItemMargin/GetItemMarginCityItem',data, httpOptions);
    }
}
