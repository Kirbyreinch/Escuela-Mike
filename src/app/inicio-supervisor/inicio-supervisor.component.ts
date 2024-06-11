import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-supervisor',
  templateUrl: './inicio-supervisor.component.html',
  styleUrls: ['./inicio-supervisor.component.css']
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

  getLogoRows(): Array<{ nombre: string, logo: string }[]> {
    const rows: Array<{ nombre: string, logo: string }[]> = [];
    for (let i = 0; i < this.logos.length; i += 4) {
      rows.push(this.logos.slice(i, i + 4));
    }
    return rows;
  }
}
