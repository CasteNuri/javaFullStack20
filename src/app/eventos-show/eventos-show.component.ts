import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { EventosService } from '../services/eventos.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-eventos-show',
  templateUrl: './eventos-show.component.html',
  styleUrls: ['./eventos-show.component.css']
})

export class EventosShowComponent implements OnInit {
  search = '';

 eventos: Evento[] = [];
 nombreArchivo: string;

 newEvento: Evento;


constructor(private eventosService: EventosService, private title: Title) { }

ngOnInit(): void {
  this.title.setTitle('Eventos | Angular Eventos');
  // Al trabajar con observables que nos devuelven un array de productos debemos usar el subscribe:
  this.eventosService.getEventos().subscribe(
  events => this.eventos = events,
  error => console.error(error)
);

}

orderDate(event: Event) {
  event.preventDefault();
  this.eventos.sort((e1, e2) => {
    return e1.date.localeCompare(e2.date);
  });
  this.restoreArray();
}

orderPrice(event: Event) {
  event.preventDefault();
  this.eventos.sort((e1, e2) => e1.price - e2.price);
  this.restoreArray();
}




/*changeEventos(newEvento: Evento) {
  this.eventos = [...this.eventos, newEvento];
}*/

deleted(evento: Evento) {
  const position = this.eventos.indexOf(evento);
  this.eventos.splice(position, 1);
  this.restoreArray();
  // this.eventos = this.eventos.filter(e => e !== evento);

}

restoreArray() {
  this.eventos = [...this.eventos];
}

}

