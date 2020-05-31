import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../interfaces/evento';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'evento-detail',
  templateUrl: './evento-detail.component.html',
  styleUrls: ['./evento-detail.component.css']
})
export class EventoDetailComponent implements OnInit {
  evento: Evento;

  constructor(
    private route: ActivatedRoute,
    private eventosService: EventosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Esto sería necesario si navegamos entre diferentes eventos
    // sin salir de la página de detalle de evento
    /*this.route.params.pipe(
      switchMap(params => {
        const id = +params.id;
        return this.eventosService.getEvento(id);
      })
    ).subscribe(evento => this.evento = evento);*/

   this.evento = this.route.snapshot.data.evento;
  }

  goBack() {
    this.router.navigate(['/eventos']);
  }

}
