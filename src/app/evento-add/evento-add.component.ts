import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Evento } from '../interfaces/evento';
import { EventosService } from '../services/eventos.service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';


@Component({
  selector: 'evento-add',
  templateUrl: './evento-add.component.html',
  styleUrls: ['./evento-add.component.css']
})
export class EventoAddComponent implements OnInit /*, ComponentDeactivate*/ {

 newEvento: Evento;
 nombreArchivo: string;

  // @Output() eventoAdded = new EventEmitter<Evento>();

  saved = false;

  private inicializarEvento(){
    this.newEvento = {
      name: '',
      description: '',
      image: '',
      price: 0,
      date: ''
    };
    this.nombreArchivo = '';
  }

  constructor(
    private eventosService: EventosService,
    private title: Title,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.title.setTitle('AddEvento | Angular Eventos');
    this.inicializarEvento();
  }

  addEvento() {
    this.eventosService.addEvent(this.newEvento).subscribe(
      evento =>  {
        this.saved = true;
        this.router.navigate(['/eventos']);
      }
    );

  }

  changeImage(fileInput: HTMLInputElement) {
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', e => {
    this.newEvento.image = reader.result as string;
    });
  }

  canDeactivate(): boolean {
    return confirm('¿Seguro que quiere abandonar la página?');
  }
}
