import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';

@Injectable()
export class TransferReceiptNoteService {

  constructor(private http: HttpClient) { }
  public getTransferReceipt(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetTransferReceiptNoteList', data);

  }

  public getTRNById(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetById', data);
  }

  public searchTRNItems(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/TransferReceiptNote/GetAllTRNItems', data);
  }
  public addTRNitem(data): Observable<any> {
    console.log(data, 'kya ja rha addddddd');
    return this.http.post(APP_SETTINGS.base_url + '/api/TransferReceiptNote/AddTRNItems', data);
  }
  public UpdateTRN(data): Observable<any> {
    console.log(data, 'kya ja rha update trn');
    return this.http.post(APP_SETTINGS.base_url + '/api/TransferReceiptNote/UpdateTRN', data);
  }
  public releaseTrn(data): Observable<any> {
    console.log(data, 'kya ja rha release trn');
    return this.http.post(APP_SETTINGS.base_url + '/api/TransferReceiptNote/ReleaseTRN', data);
  }
}
