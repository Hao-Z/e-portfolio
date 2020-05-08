import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../../global";
import { Introduction } from "../models/introduction.model";
import { PATCH } from '../../core/services/api.const';
import { CustomOptionsService } from "../../core/services/custom-options.service";

@Injectable({
  providedIn: 'root'
})
export class IntroductionApiService {
  
  private apiUrl = globals.backend_path + "users/";

  constructor(private http: HttpClient, private options: CustomOptionsService) { }

  public getIntro(id: number): Observable<Introduction> {
    const url = `${this.apiUrl}${id}/introduction`;
    return this.http.get<Introduction>(url, this.options.getHttpOptions(null))
      .pipe(
        map(response => {
          return response as Introduction
        }),
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public updateIntro(id: number, introduction: Introduction): Observable<Introduction> {
    const url = `${this.apiUrl}${id}/introduction`;
    const httpOptions = this.options.getHttpOptions(PATCH);
    return this.http.post(url, introduction, httpOptions)
      .pipe(
        map(response => {
          return response as Introduction
        }),
        retry(1),
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }

}
