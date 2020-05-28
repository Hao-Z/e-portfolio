import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
    providedIn: 'root'
  })
export class HttpErrorHandler {
  
    constructor(private alertService: AlertService) { }

    errorHandler(error: HttpErrorResponse) {
        var err = { 'code': null, message: "" };
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          err.code = 0;
          err.message = error.error.message
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);    
            err.code = error.status;
            err.message = JSON.stringify(error.error)  
          }
        return throwError(err);
      }

}