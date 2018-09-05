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
export class VendorModuleService {

  constructor(private httpService: HttpClient) { }

 
  public getVendorList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Vendor/GetVendorSeacrh', data, httpOptions);
  }

  //api for Tax creation

  public createVendor(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Vendor/Save', data, httpOptions);
  }

  // api for editing Tax

  public updateVendor(data):Observable<any>{
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Vendor/Save', data, httpOptions);
  }

   // api for changing status 

   public changeStatus(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Vendor/ChangeStatus',data, httpOptions);
  }


  // method for getting vendor details by passing vendor id
  public getVendorDetails(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Vendor/GetById',data, httpOptions);
  }
  


 
}
