import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  constructor(private http: HttpClient) { }


  // public uploadBrandFile(data): Observable<any> {
  //   return this.httpService.post(APP_SETTINGS.base_url + 'api/Brand/GetBrandList', data, httpOptions);
  // }
  public uploadBrand(files: string,createdBy:number,importUrlToAppend:string): Observable<any> {
    var formdata: FormData = new FormData();
    
    formdata.append('files', files);
    console.log(formdata,"data");
    formdata.append('CreatedBy',"1");
   
    return this.http.post(APP_SETTINGS.base_url + importUrlToAppend, formdata,{
      responseType:  'json'
  });
  
  }
}
