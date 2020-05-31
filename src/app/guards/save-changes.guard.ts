import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EventoAddComponent } from '../evento-add/evento-add.component';


export interface ComponentDeactivate {
  canDeactivate: () => boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>;
}


@Injectable({
  providedIn: 'root'
})
export class SaveChangesGuard implements CanDeactivate<ComponentDeactivate> {
  canDeactivate(
    component: ComponentDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return component.canDeactivate();
  }

}
