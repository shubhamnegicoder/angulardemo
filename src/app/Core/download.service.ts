import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';

const  headers = new HttpHeaders({ 'Accept': 'application/pdf' });

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) { }

  downloadFile(fileName:string): Observable<any>{

  
    return this.http.get(fileName, { headers: headers, responseType: 'blob' });
  }
}
