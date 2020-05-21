import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../../global";
import { PATCH } from './api.const';
import { CustomOptionsService } from "./custom-options.service";
import { HttpErrorHandler } from "./http-error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class UniqueApiService {
  
  private apiUrl = globals.backend_path + "users/";

  constructor(
    private http: HttpClient, 
    private options: CustomOptionsService,
    private httpErrorHandler: HttpErrorHandler
    ) { }

  public get<T>(id: number, subUrl: string): Observable<T> {
    const url = `${this.apiUrl}${id}/${subUrl}`;
    return this.http.get<T>(url, this.options.getHttpOptions(null))
      .pipe(
        map((res: any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public update<T>(id: number, body: T, subUrl: string): Observable<T> {
    const url = `${this.apiUrl}${id}/${subUrl}`;
    const httpOptions = this.options.getHttpOptions(PATCH);
    return this.http.post(url, body, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as T
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

}
