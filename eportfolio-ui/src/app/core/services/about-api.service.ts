import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomOptionsService } from './custom-options.service';
import { HttpErrorHandler } from './http-error-handler.service';
import * as globals from "../../../global";
import { Observable } from 'rxjs';
import { About } from '../models/about.model';
import { map, retry, catchError } from 'rxjs/operators';
import { PATCH } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class AboutApiService {

  private apiUrl = globals.backend_path + "users/";

  constructor(
    private http: HttpClient, 
    private options: CustomOptionsService,
    private httpErrorHandler: HttpErrorHandler
  ) { }

  public get(id: number): Observable<About> {
    const url = `${this.apiUrl}${id}`;
    return this.http.get<About>(url, this.options.getHttpOptions(null))
      .pipe(
        map((res: any) => {
          return res.body as About
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public create(id: number, about: About): Observable<About>{
    const url = `${this.apiUrl}${id}/about`;
    return this.http.post(url, about, this.options.getHttpOptions(PATCH))
      .pipe(
        map((res:any) => {
          return res.body as About
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }




}
