import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../interfaces/responses';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly eventsURL = '/auth';
  private logged = false;
  loginChange$ = new EventEmitter<boolean>();

  constructor(private http: HttpClient) { }

  private setLogged(logged: boolean) {
    this.logged = logged;
    this.loginChange$.emit(logged);
  }



  login(email: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${this.eventsURL}/login`, { email, password }).pipe(

      map(resp => {
        localStorage.setItem('token', resp.accessToken);
        this.setLogged(true);
      })
    );
  }

  logout(): void {
    // remove user from local storage and set logged and loginChange to false
    localStorage.removeItem('token');
    this.setLogged(false);
  }

  isLogged(): Observable<boolean> {

    const token = localStorage.getItem('token');
    if (this.logged) {
      return of(true);
    } else if (!token) {
      return of(false);
    } else {
      return this.http.get<void>(`${this.eventsURL}/validate`).pipe(
        map(() =>  {
         this.setLogged(true);
         return true;
        }),

        catchError((error: HttpErrorResponse) => {
          localStorage.removeItem('token');
          return of(false);
        })
      );
    }
  }
}
