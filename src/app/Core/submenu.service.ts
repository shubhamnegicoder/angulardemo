import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {catchError,map} from 'rxjs/operators'
import { SubMenu } from './interface';
const httpOptions = { 'headers': new HttpHeaders({'content-type':'application/json'}) }

@Injectable({
  providedIn: 'root'
})
export class SubmenuService {
   arr:Array<any>=[{'parentId':0,children:[{'id':1,name:'a'}]},{'parentId':1,children:[{'id':1,name:'b'},{'id':1,name:'b'},{'id':1,name:'b'}]},
  {'parentId':2,children:[{'id':1,name:'product'}]}];


  constructor(private httpService:HttpClient) { }
  
  public getSubMenu(parentId:number):Observable<Array<SubMenu>>
   {
    const obj={
      "userId": 2,
      "menuId": parentId
    }

    return this.httpService.post('http://103.12.132.77:6002/api/RolePermission/GetMenuDetails', obj, httpOptions).pipe(map((response:any) => {
      console.log("response received:- " +response.didError);  
    if (!response.didError) {
      console.log("response received:- " +response.model.subModules);
        return response.model.subModules;

      } else
        return [];

    }), catchError(this.handleError));


   }


   private handleError(error: HttpErrorResponse) {
    console.error('server error:', error);
    if (error.error instanceof Error) {
      const errMessage = error.error.message;
      return Observable.throw(errMessage);
      // Use the following instead if using lite-server
      // return Observable.throw(err.text() || 'backend server error');
    }
    return Observable.throw(error || 'Server error');
  }


   
}
