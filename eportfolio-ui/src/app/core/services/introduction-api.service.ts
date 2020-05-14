import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../../global";
import { Introduction } from "../models/introduction.model";
import { PATCH } from '../../core/services/api.const';
import { CustomOptionsService } from "../../core/services/custom-options.service";
import { HttpErrorHandler } from "./http-error-handler.service";

@Injectable({
  providedIn: 'root'
})
export class IntroductionApiService {
  
  private apiUrl = globals.backend_path + "users/";

  constructor(
    private http: HttpClient, 
    private options: CustomOptionsService,
    private httpErrorHandler: HttpErrorHandler
    ) { }

  public get(id: number): Observable<Introduction> {
    const url = `${this.apiUrl}${id}/introduction`;
    return this.http.get<Introduction>(url, this.options.getHttpOptions(null))
      .pipe(
        map((res: any) => {
          return res.body as Introduction
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

  public update(id: number, introduction: Introduction): Observable<Introduction> {
    const url = `${this.apiUrl}${id}/introduction`;
    const httpOptions = this.options.getHttpOptions(PATCH);
    return this.http.post(url, introduction, httpOptions)
      .pipe(
        map((res:any) => {
          return res.body as Introduction
        }),
        retry(1),
        catchError(this.httpErrorHandler.errorHandler)
      )
  }

}
