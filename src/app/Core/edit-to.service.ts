import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EditToService {

  constructor(private Http: HttpClient) { }
  public getToDetail(data): Observable<any> {
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/GetTODetail', data);
  }
  public auto(data): Observable<any> {
    return this.Http.get(APP_SETTINGS.base_url + '/api/Item/GetSearchedItemList?Name=' + data);
  }
  public searchItems(data): Observable<any> {
    console.log(data, 'data to be posted');
    return this.Http.post(APP_SETTINGS.base_url + '/api/TransferOrder/GetAllSearchedTOItems', data);
  }
  public insertToItems(data): Observable<any> {
    console.log(data, 'data for inserting');
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/InsertTOItems', data);
  }
  public updateTO(data): Observable<any> {
    console.log(data, 'data to be updated');
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/UpdateTO', data);
  }
  public deleteTO(data): Observable<any> {
    console.log(data, 'data to be deleted');
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/DeleteTOI', data);
  }
  public releaseTO(data): Observable<any> {
    console.log(data,'released data')
    return this.Http.post(APP_SETTINGS.base_url + 'api/TransferOrder/ReleaseTO', data);

  }
}
