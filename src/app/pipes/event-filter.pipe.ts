import { Pipe, PipeTransform } from '@angular/core';
import { Evento } from '../interfaces/evento';

@Pipe({
  name: 'eventFilter'
})

export class EventFilterPipe implements PipeTransform {

  transform(eventos: Evento[], filterBy: string): Evento[] {
    const filter = filterBy ? filterBy.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '') : null;
    if (!filter) {
      return eventos;
    } else {
      return eventos.filter(evento =>
        evento.description.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filter) ||
        evento.name.toLocaleLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filter));
    }


  }

}
