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
  rol: string | null = null; // Variable para almacenar el rol del usuario
  hideLogo: boolean = false; // Variable para determinar si se debe ocultar el logo

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.username$.subscribe(username => {
      this.username = username;
    });

    this.authService.logo$.subscribe(logo => {
      this.escuelaLogo = logo;
      console.log('Logo de la escuela:', this.escuelaLogo); // Console log for the logo
      this.openLogo();
    });

    // Listen to navigation events to update the header on route change
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateUserInfo();
      this.checkRoute(); // Check route on navigation
    });

    this.updateUserInfo();
    this.checkRoute(); // Check route on initial load
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

    // Obtener el rol del usuario desde localStorage
    this.rol = localStorage.getItem('rol');
  }

  // Método para verificar si el rol es "supervisor"
  isSupervisor(): boolean {
    return this.rol === 'supervisor';
  }

  // Método para verificar si el rol es "director"
  isDirector(): boolean {
    return this.rol === 'director';
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

  openLogo() {
    if (this.escuelaLogo) {
      this.authService.getlogofile(this.escuelaLogo).subscribe(
        (data: Blob) => {
          const imageUrl = URL.createObjectURL(data);
          // Asignar la URL de la imagen al atributo src de la etiqueta <img>
          this.escuelaLogo = imageUrl;
        },
        (error) => {
          console.error('Error al obtener la imagen:', error);
        }
      );
    } else {
      console.error('El nombre del logo no está definido');
    }
  }

  // Método para verificar la ruta actual
  checkRoute() {
    const currentRoute = this.router.url;
    this.hideLogo = ['/supervisor', '/datos_supervisor', '/supervisor_escuelas'].includes(currentRoute);
  }
}