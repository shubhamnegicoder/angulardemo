import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IUserLogin, APP_SETTINGS, MainModules, SubMenu } from './interface';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import * as Rx from "rxjs";
const httpOptions = { 'headers': new HttpHeaders({'content-type':'application/json'}) }

@Injectable()
export class AuthService {

  menuList:Array<MainModules>=[];
  subMenuList:Array<SubMenu>=[];
  username:string='';
  //@Output() userAuth: EventEmitter<boolean> = new EventEmitter<boolean>();
   subject = new Rx.BehaviorSubject(false);
  isLoggedIn: boolean = false;

  constructor(private httpService: HttpClient,private router:Router) { }

  // public logIn(obj:IUserLogin): Observable<Array<any>> {
   
  //   //const obj={'username':'admin','password':'password'}

  //   return this.httpService.post('http://103.12.132.77:6002/api/User/Login', obj, httpOptions).pipe(map((response:any) => {
  //     console.log("response received:- " +response.didError);  
  //   if (!response.didError) {
  //     console.log("response received:- " +response.model.mainModules);
  //       return response.model.mainModules;

  //     } else
  //       return false;

  //   }), catchError(this.handleError));
  // }

  public logIn(obj: IUserLogin): Observable<boolean> {
    return this.httpService.post(APP_SETTINGS.base_url + 'api/User/Login', obj, httpOptions).pipe(map((response:any) => {
      if (!response.didError) {
        this.username=response.model.name;
        sessionStorage.setItem('username', response.model.name);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('isLogged', "1");
        this.isLoggedIn = true;
        //this.userAuth.emit(this.isLoggedIn);
        this.subject.next(true);
        this.menuList = response.model.mainModules;
        this.subMenuList = response.model.subModules; 
        return true;

      } else
        return false;

    }), catchError(this.handleError));
  }
  // public logIn(): Array<any> {
  //  const arr = [{'parentId':0,"name":"Dashboard"},{'parentId':1,"name":"Location"},{'parentId':2,"name":"Product Catalogue"},{'parentId':3,"name":"Stock Transfer"}];

  //   return arr;

   
  // }

  public getModulesByUserID(data): Observable<any> {
   

    return this.httpService.post('http://103.12.132.77:6002/api/User/GetModuleByUserId', data, httpOptions).pipe(map((response:any) => {
      console.log("response received:- " +response.didError);  
    if (!response.didError) {
      console.log("GetModules response received:- " +JSON.stringify(response));
      this.isLoggedIn = true;
      this.menuList = response.model.mainModules;
      this.subMenuList = response.model.subModules; 
      sessionStorage.setItem('username', response.model.name);
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('isLogged', "1");
        return true;

      } else
        return false;

    }), catchError(this.handleError));
  }

  public logOut(): boolean {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('isLogged')
    this.isLoggedIn = false;
  //  this.userAuth.emit(this.isLoggedIn);
  this.subject.next(false);
   // this.appcomponent.isLoggedIn = false;
    this.router.navigate(['/'])
    return true;
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
