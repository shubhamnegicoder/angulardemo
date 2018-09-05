import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CreateToService {

  constructor(private Http: HttpClient) { }
  public getToLocations(data): Observable<any> {
    console.log(data, 'data to be posted');
    console.log('base_url', APP_SETTINGS.base_url);
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/GetTOLocations',  data);
  }

  public auto(data): Observable<any> {
    return this.Http.get(APP_SETTINGS.base_url + '/api/Item/GetSearchedItemList?Name='+data);
  }

  public searchItems(data): Observable<any> {
    console.log(data, 'data to be posted');
    return this.Http.post(APP_SETTINGS.base_url + '/api/TransferOrder/GetAllSearchedTOItems',  data);
  }

  public createTO(data): Observable<any> {
    console.log(data, 'data to be posted for creating TO');
   return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/CreateTO', data);
  }
}
