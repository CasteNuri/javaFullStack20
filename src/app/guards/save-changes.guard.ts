import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EventoAddComponent } from '../evento-add/evento-add.component';


/*export interface ComponentDeactivate {
  canDeactivate: () => boolean;
}*/


@Injectable({
  providedIn: 'root'
})
export class SaveChangesGuard implements CanDeactivate<EventoAddComponent/*ComponentDeactivate*/> {
  canDeactivate(
    component: EventoAddComponent/*ComponentDeactivate*/,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean {
      if (component.saved) {
        return true;
      }
      return component.canDeactivate();
  }

}
