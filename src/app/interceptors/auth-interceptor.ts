import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token'); // Obtenemos el token del LocalStorage
    if (token) {
    // Clonamos la petición y le añadimos el encabezado Authorization
    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
    // Enviamos al servidor la petición clonada con el token
    return next.handle(authReq);
    } else {
      return next.handle(req); // Si no hay token, enviamos petición original
    }

  }
}
