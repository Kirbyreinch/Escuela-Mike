import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from '../auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string | null = null;
  escuelaLogo: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });

    this.authService.logo$.subscribe(logo => {
      this.escuelaLogo = logo;
      console.log('Logo de la escuela:', this.escuelaLogo); // Console log for the logo
    });

    // Listen to navigation events to update the header on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUserInfo();
    });

    this.updateUserInfo();
  }

  updateUserInfo(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.authService.updateUsername(username);
    }

    const escuelaNombre = localStorage.getItem('escuela');
    if (escuelaNombre) {
      this.authService.getEscuelaByNombre(escuelaNombre).subscribe(
        (response) => {
          this.authService.updateLogo(response.logo);
        },
        (error) => {
          console.error('Error al obtener los datos de la escuela', error);
        }
      );
    }
  }

  shouldShowMiddleSection(): boolean {
    return this.router.url !== '/login';
  }

  shouldShowRightSection(): boolean {
    return this.router.url !== '/login';
  }

  logout() {
    localStorage.clear();
    this.authService.updateUsername('');
    this.authService.updateLogo('');
    this.router.navigate(['/login']);
  }
}