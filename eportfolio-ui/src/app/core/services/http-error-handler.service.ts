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
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
          // this.alertService.error(`${error.error.message} Something bad happened, please try again later.`)
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
            // this.alertService.error(`Backend returned code ${error.status}, something bad happened, please try again later.`)        
          }
          // this.alertService.error(`Something bad happened, please try again later.`)
        // return an observable with a user-facing error message
        return throwError(
         'Something bad happened; please try again later.');
      }

}