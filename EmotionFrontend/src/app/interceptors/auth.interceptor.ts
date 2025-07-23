import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage
    const token = localStorage.getItem('access_token');
    
    console.log('[INTERCEPTOR] Request URL:', req.url);
    console.log('[INTERCEPTOR] Token available:', token ? 'Yes' : 'No');
    if (token) {
      console.log('[INTERCEPTOR] Token preview:', token.substring(0, 20) + '...');
    }
    
    // Clone the request and add Authorization header if token exists
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        // Include credentials for session cookies
        withCredentials: true
      });
      console.log('[INTERCEPTOR] Added Authorization header');
      return next.handle(authReq);
    }
    
    // If no token, still include credentials for session cookies
    const credReq = req.clone({
      withCredentials: true
    });
    
    console.log('[INTERCEPTOR] No token, sending with credentials only');
    return next.handle(credReq);
  }
}
