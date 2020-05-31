import { Injectable, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginResponse } from '../interfaces/responses';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly eventsURL = '/auth/';
  logged: boolean;
  loginChange$: EventEmitter<boolean>;

  constructor(private http: HttpClient) { }


  login(email: string, password: string): Observable<void> {
    return this.http.post<LoginResponse>(`${this.eventsURL}/login`, { email, password }).pipe(

      map(token => {
        localStorage.setItem('token', JSON.stringify(token));
        this.logged = true;
        this.loginChange$.emit(true);
      })
    );
  }

  logout() {
    // remove user from local storage and set logged and loginChange to false
    localStorage.removeItem('token');
    this.logged = false;
    this.loginChange$.emit(false);
  }

  isLogged(): Observable<boolean> {

    if (this.logged) {
      return of(true);
    } else if (!this.logged && localStorage.getItem('token') == null) {
      return of(false);
    } else {
      this.http.get<boolean>(`${this.eventsURL}/validate`).pipe(
        map(resp => {
          if (resp) {
            this.logged = true;
            return true;
          }
        },
        catchError((resp: any) => {
          if (!resp.ok){
            this.logged = false;
            localStorage.removeItem('token');
            return of(false);
          }
        }))
      );
    }

  }
}
