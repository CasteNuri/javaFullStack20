import { Injectable } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { EventosResponse, EventoResponse, /*EventoDeleteResponse*/ } from '../interfaces/responses';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  private readonly eventsURL = '/eventos';

  constructor( private http: HttpClient) { }

  getEventos(): Observable<Evento[]>{
    return this.http.get<EventosResponse>(this.eventsURL).pipe( // pipe transforma los datos que le llegan del servidor
      map(resp => resp.eventos)
    );

  }

  getEvento(id: number): Observable<Evento> {
    return this.http.get<EventoResponse>(`${this.eventsURL}/${id}`).pipe(
      map(resp => resp.evento)
    );
  }

  addEvent(evento: Evento): Observable<Evento> {
    return this.http.post<EventoResponse>(this.eventsURL, evento).pipe(
      map(resp => resp.evento)
    );
  }

  deleteEvento(idEvent: number): Observable<void/*boolean*/> {
    return this.http.delete<void/*EventoDeleteResponse*/>(`${this.eventsURL}/${idEvent}`)/*.pipe(
      catchError((resp: HttpErrorResponse) => throwError(`Error borrando evento!. Código de
     servidor: ${resp.status}. Mensaje: ${resp.message}`)),
      map(resp => {
      if (!resp.ok) { throw resp.error; }
      return true;
      })
      )*/;
  }



}
