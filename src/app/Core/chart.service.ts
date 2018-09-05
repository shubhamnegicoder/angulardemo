import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APP_SETTINGS } from './interface';
import { Observable } from 'rxjs';
const httpOptions = { 'headers': new HttpHeaders({ 'content-type': 'application/json' }) };
@Injectable()
export class ChartService {

  constructor(private httpService: HttpClient) { }

  public getChartData(): Observable<any> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/Dashboard/GetDBStatusChart', {}, httpOptions);
  }

}
