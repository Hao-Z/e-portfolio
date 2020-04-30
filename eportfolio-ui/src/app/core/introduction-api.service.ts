import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import * as globals from "../../global";
import { Observable, throwError } from 'rxjs';
import { Introduction } from "../dynamic-form/interfaces/introduction";
import { catchError, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntroductionApiService {

  // private introductionsUrl = globals.backend_path + "users";
  private introductionsUrl = '/users/'

  private httpOptions = {
    headers: new HttpHeaders({ 
      // 'Access-Control-Allow-Origin': 'http://localhost:8080',
      // 'Access-Control-Request-Method': 'PATCH, OPTIONS', 
      // 'Access-Control-Allow-Headers': 'Authorization, content-type',
      'Content-Type':  'application/json',
      'Authorization': localStorage.getItem('jwt_token'),
    })
  };

  constructor(private http: HttpClient) { }

  public getIntro(id: number): Observable<Introduction> {
    const url = `${this.introductionsUrl}${id}/introduction`;
    return this.http.get<Introduction>(url, this.httpOptions)
      .pipe(
        map(response => {
          console.log('headers get', JSON.stringify(this.httpOptions))
          console.log('get service!')
          return response as Introduction
        }),
        retry(1),
        catchError(this.errorHandler)
      );
  }

  public updateIntro(id: number, introduction: Introduction): Observable<Introduction> {
    const url = `${this.introductionsUrl}${id}/introduction`;
    return this.http.patch(url, introduction, this.httpOptions)
      .pipe(
        map(response => {
          console.log('headers patch', JSON.stringify(this.httpOptions))
          console.log('patch service!')
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
