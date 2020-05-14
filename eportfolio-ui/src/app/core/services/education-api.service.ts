import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../../global";
import { CustomOptionsService } from "../../core/services/custom-options.service";
import { Education } from "../models/education.model";
import { HttpErrorHandler } from './http-error-handler.service';
import { DELETE } from './api.const';

@Injectable({
  providedIn: 'root'
})
export class EducationApiService {

  private apiUrl = globals.backend_path + "users/";

  constructor(
    private http: HttpClient, 
    private options: CustomOptionsService,
    private httpErrorHandler: HttpErrorHandler
    ) { }

  public get(id: number): Observable<Education> {
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(new HttpParams().set('class', 'education'));
    return this.http.get<Education>(url, httpOptions)
      .pipe(
        map((res: any) => {
          return res.body as Education
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public create(id: number, education: Education): Observable<Education>{
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(new HttpParams().set('class', 'education'));
    return this.http.post(url, education, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as Education
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public delete(id: number, object_id: string): Observable<Education>{
    const url = `${this.apiUrl}${id}`;
    const httpOptions = this.options.getHttpOptions(DELETE.set('class', 'education').set('object-id', object_id));
    return this.http.post(url, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as Education
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

}
