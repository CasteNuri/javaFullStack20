import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-eventos';
  logueado = false;

  constructor(private router: Router, private authService: AuthService) {}


  ngOnInit(): void {
    this.authService.loginChange$.subscribe(
      (resp: boolean) => this.logueado = resp
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
