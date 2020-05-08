import { HttpParams } from "@angular/common/http";

export const PATCH = new HttpParams().set('_method', 'patch');
export const PUT = new HttpParams().set('_method', 'put');
export const DELETE =  new HttpParams().set('_method', 'delete');