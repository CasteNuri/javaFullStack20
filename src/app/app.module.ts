import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Route } from '@angular/router';

import { AppComponent } from './app.component';
import { EventosShowComponent } from './eventos-show/eventos-show.component';
import { EventFilterPipe } from './pipes/event-filter.pipe';
import { EventoItemComponent } from './evento-item/evento-item.component';
import { EventoAddComponent } from './evento-add/evento-add.component';
import { BaseUrlInterceptor } from './interceptors/base-url.interceptor';
import { EventoDetailComponent } from './evento-detail/evento-detail.component';
import { SaveChangesGuard } from './guards/save-changes.guard';
import { EventoDetailResolve } from './resolvers/evento-detail.resolve';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { LoginActivateGuard } from './guards/login-activate.guard';
import { LogoutActivateGuard } from './guards/logout-activate.guard';


const APP_ROUTES: Route[] = [
  {path: 'login', component: LoginPageComponent, canActivate: [LogoutActivateGuard]},
  {path: 'eventos', component: EventosShowComponent, canActivate: [LoginActivateGuard]},
  {path: 'eventos/add', component: EventoAddComponent, canDeactivate: [SaveChangesGuard], canActivate: [LoginActivateGuard]},
  {path: 'eventos/:id',
    component: EventoDetailComponent,
    resolve: {
      evento: EventoDetailResolve
    },
    canActivate: [LoginActivateGuard]
  },
  {path: '',  redirectTo: '/eventos', pathMatch: 'full'},
  {path: '**',  redirectTo: '/eventos', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    EventosShowComponent,
    EventFilterPipe,
    EventoItemComponent,
    EventoAddComponent,
    EventoDetailComponent,
    LoginPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
