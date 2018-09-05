import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Title } from '@angular/platform-browser';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const httpOptionsForPdf = {
  headers: new HttpHeaders({ 'Content-Type': 'Accept' }),
  header1:new HttpHeaders({"Access-Control-Allow-Origin": "*"}),
  header2:new HttpHeaders({"Access-Control-Allow-Headers": "Origin"})
}

  

@Injectable()
export class CommonService {

  constructor(private http: HttpClient,private title:Title) { }
  public getwarehouse(): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Warehouse/GetWarehouseByUserId?UserId=', httpOptions );

  }

  public setTitle( newTitle: string) {
    this.title.setTitle( newTitle );
  }  


  public printPDF(data,url):Observable<any>
  {
    return this.http.post(APP_SETTINGS.base_url+url,data,httpOptions);
  }

  public getCitiesFromStateId(stateId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/City/GetCitiesByState?StateId=' + stateId, httpOptions);
  }

  public getRegionListFromCountryId(CountryId,userId): Observable<any> {
    return this.http.get(APP_SETTINGS.base_url + 'api/Region/GetRegionByCountry?UserId='+userId+'&CountryId='+CountryId, httpOptions);
  }
  public qtyChangeValidation(data){
    if(!((data.keyCode > 95 && data.keyCode < 106)
    || (data.keyCode > 47 && data.keyCode < 58) 
    || data.keyCode == 8)) {
      return false;
  }
  }
  public getAllCountry(data): Observable<any> {
    return this.http.post(APP_SETTINGS.base_url + 'api/Country/GetAllCountry',data, httpOptions);
  }
}
