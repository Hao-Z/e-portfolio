import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../../global";
import { CustomOptionsService } from "./custom-options.service";
import { HttpErrorHandler } from './http-error-handler.service';
import { DELETE, PUT } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = globals.backend_path + "users/";

  constructor(
    private http: HttpClient, 
    private options: CustomOptionsService,
    private httpErrorHandler: HttpErrorHandler
  ) { }

  public get<T>(id: number, className: string, object_id: string): Observable<T> {
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(new HttpParams().set('class', className).set('object-id', object_id));
    return this.http.get<T>(url, httpOptions)
      .pipe(
        map((res: any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public create<T>(id: number, body: T, className: string): Observable<T>{
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(new HttpParams().set('class', className));
    return this.http.post(url, body, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public update<T>(id: number, body: T, className: string, object_id: string): Observable<T>{
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(PUT.set('class', className).set('object-id', object_id));
    return this.http.post(url, body, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public delete<T>(id: number, className: string, object_id: string): Observable<T>{
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(DELETE.set('class', className).set('object-id', object_id));
    return this.http.post(url, null, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

}
