import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpInterceptors implements HttpInterceptors {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.logRequestTime();

    return next.handle(request);
  }

  logRequestTime() {
    var d = new Date();
    var dformat = [d.getDate(), d.getMonth() + 1, d.getFullYear()].join('/') + ' ' + [d.getHours(),d.getMinutes(),d.getSeconds()].join(':');

console.log('Request sent at ' + dformat);
  }
}
