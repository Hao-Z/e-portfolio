import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import * as globals from "../../global";
import { Introduction } from "../dynamic-form/interfaces/introduction";
import { PATCH } from '../core/api.const';
import { CustomOptionsService } from "../core/custom-options.service";

@Injectable({
  providedIn: 'root'
})
export class IntroductionApiService {

  private introductionsUrl = globals.backend_path + "users/";

  constructor(private http: HttpClient, private options: CustomOptionsService) { }

  public getIntro(id: number): Observable<Introduction> {
    const url = `${this.introductionsUrl}${id}/introduction`;
    return this.http.get<Introduction>(url, this.options.httpOptions)
      .pipe(
        map(response => {
          return response.body as Introduction
        }),
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public updateIntro(id: number, introduction: Introduction): Observable<Introduction> {
    const url = `${this.introductionsUrl}${id}/introduction`; 
    this.options.httpOptions.params = PATCH;
    return this.http.post(url, introduction, this.options.httpOptions)
      .pipe(
        map(response => {
          return response.body as Introduction
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
