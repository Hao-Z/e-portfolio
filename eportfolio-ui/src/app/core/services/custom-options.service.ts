import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CustomOptionsService {

  constructor() { }
  
  public getHttpOptions(params: HttpParams): {} {
    return {
      headers: new HttpHeaders({ 
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('jwt_token'),
      }),
      params: params,
      observe: 'response' 
    }
  }

  public getLinkHttpOptions(params: HttpParams): {} {
    return {
      headers: new HttpHeaders({ 
        'Authorization': localStorage.getItem('jwt_token'),
      }),
      params: params,
      responseType: 'text',
      observe: 'response' 
    }
  }

  public getShareHttpOptions(shared_link: string): {} {
    if (shared_link) {
      if (localStorage.getItem('jwt_token')) {
        return {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'shared-link': shared_link,
            'Authorization': localStorage.getItem('jwt_token'),
          }),
          observe: 'response' 
        }
      } else {
        return {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'shared-link': shared_link,
          }),
          observe: 'response' 
        }
      }
    } else {
      if (localStorage.getItem('jwt_token')) {
        return {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('jwt_token'),
          }),
          observe: 'response' 
        }
      } else {
        return {
          headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
          }),
          observe: 'response' 
        }
      }
    }
  }
}
