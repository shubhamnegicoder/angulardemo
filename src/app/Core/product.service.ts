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

export class ProductService {

  constructor(private httpService: HttpClient) { }

  public getAllProductMaster(): Observable<any> {
    return this.httpService.get(APP_SETTINGS.base_url + 'api/Item/GetAllProductMasters');
  }
  public getProductList(data): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Item/GetItemSeacrh', data, httpOptions);
  }
  public getAllSubBrand(brandId): Observable<any> {
    const obj = { 'RequestedId': brandId, 'UserId': '1' };
    console.log(obj);
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubBrand/GetByParentId', obj, httpOptions);
  }
  public getAllSubCategory(categoryId): Observable<any> {
    const obj = { 'RequestedId': categoryId, 'UserId': '1' };
    console.log(obj);
    return this.httpService.post(APP_SETTINGS.base_url + 'api/SubCategory/GetByParentId', obj, httpOptions);
  }
  public addProduct(data: any): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Item/Save', data, httpOptions);
  }

    // api for changing status 
    public changeStatus(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Item/ChangeStatus',data, httpOptions);
    }
    public getOneProduct(data): Observable<any> {
      return this.httpService.post(APP_SETTINGS.base_url + 'api/Item/GetItemMasterById',data, httpOptions);
    }

    public updateOneProduct(data): Observable<any>{
      return this.httpService.put(APP_SETTINGS.base_url + 'api/Item/Save',data, httpOptions); 
    }
}
