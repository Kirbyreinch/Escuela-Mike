import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-supervisor',
  templateUrl: './inicio-supervisor.component.html',
  styleUrl: './inicio-supervisor.component.css'
})
export class InicioSupervisorComponent implements OnInit {
  logos: { nombre: string, logo: string }[] = []; // Se define un array de objetos con nombre y logo

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadLogos();
  }

  loadLogos() {
    this.authService.getEscuelas_supervisor().subscribe(
      (escuelas) => {
        escuelas.forEach((escuela) => {
          this.authService.getEscuelaPorNombre(escuela.escuela).subscribe(
            (data) => {
              if (data.logo) {
                this.logos.push({ nombre: escuela.escuela, logo: data.logo });
              }
            },
            (error) => {
              console.error('Error al obtener datos de la escuela:', error);
            }
          );
        });
      },
      (error) => {
        console.error('Error al cargar las escuelas:', error);
      }
    );
  }

  redirectToHome(nombreEscuela: string) {
    localStorage.setItem('escuela', nombreEscuela);
    this.router.navigate(['/inicio']);
  }

  // La función getEscuelaFromLogo no es necesaria, ya que ahora se extrae el nombre de la escuela directamente
}