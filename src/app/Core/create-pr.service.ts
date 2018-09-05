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
export class CreatePRService {

  constructor(private http: HttpClient) { }

  public searchpr(data): Observable<any> {
    //console.log(data, "seeeeeeeeeeeeerrrchhhhhh");
    return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/GetAllSearchedPROItems', data, httpOptions);
  }


public createPRO(data): Observable<any> {
console.log(data, "createPro service called")
return this.http.post(APP_SETTINGS.base_url + '/api/Outbound/CreatePRO',data, httpOptions);
} 
}
