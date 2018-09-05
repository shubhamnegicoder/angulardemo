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
export class CountryService {

  constructor(private httpService: HttpClient) { }

 // get countrylist on the basis of userid
  public getCountryList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Country/GetAllCountry', data, httpOptions);
  }

  //get countryList with active 
  public getCountryListt(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Country/GetCountryList', data, httpOptions);
  }

   //api for brand creation

   public createCountry(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Country/Save', data, httpOptions);
  }

  // api for editing brands

  public updateCountry(data): Observable<any> {
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Country/Save', data, httpOptions);
  }

  // api for changing status 

  public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Country/ChangeStatus',data, httpOptions);
  }
}
