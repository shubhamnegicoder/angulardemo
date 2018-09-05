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
export class MachineService {

  constructor(private httpService: HttpClient) { }

  public getMachineList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Customer/GetCustomerSeacrh', data, httpOptions);
  }

   //api for brand creation
   public createMachine(data):Observable<any>{
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Customer/Save', data, httpOptions);
  }

  // api for editing brands
  public updateMachine(data):Observable<any>{  
    return this.httpService.put(APP_SETTINGS.base_url + 'api/Customer/Save', data, httpOptions);
  }

    // api for changing status 
    public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Customer/ChangeStatus',data, httpOptions);
    }


     // api for filter options data
     public getFilterOptionsData(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Customer/GetCustomerSearchDetail',data, httpOptions);
    }
    
    

    public getSubWareHouse(cityId,userId):Observable<any>{
      return this.httpService.get(APP_SETTINGS.base_url + 'api/Customer/GetSubWarehouseByCity?UserId='+userId+'&CityId='+cityId, httpOptions);
    }


    // method to get machine from machine id

    public getMachineDetails(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Customer/GetById',data, httpOptions);
    }
}
