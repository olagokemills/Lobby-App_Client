import { inject, Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders
}from '@angular/common/http';

import { Observable } from 'rxjs'

@Injectable()
export class HeaderInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const token = JSON.parse(sessionStorage.getItem('userDeets'))?.accessToken 
        const headerDict = {
            Authorization: `Bearer ${token}`,
            "Permissions-Policy": "camera=*,geolocation=*,microphone=*,autoplay=*,fullscreen=*,picture-in-picture=*,sync-xhr=*,encrypted-media=*,oversized-images=*",
            "Strict-Transport-Security": "max-age=31536000; includeSubdomains",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "X-Xss-Protection": "1; mode=block",
            "Content-Security-Policy": "script-src https: 'unsafe-inline' 'unsafe-eval';style-src https: 'unsafe-inline' 'unsafe-eval';img-src https: data:;font-src https: data:;",    
            "access-control-allow-origin": "*",
            "cache-control": "no-cache",
            "mode": 'no-cors',
            "Access-Control-Allow-Headers": "X-Token"
        }
        request =  request.clone({
            headers: new HttpHeaders(headerDict), 
        });
          const requestOptions = {                                                                                                                                                                                 
            headers: new HttpHeaders(headerDict), 
          };
          
        return next.handle(request)
    }
}