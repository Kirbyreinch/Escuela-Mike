import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio-supervisor',
  templateUrl: './inicio-supervisor.component.html',
  styleUrls: ['./inicio-supervisor.component.css']
})
export class InicioSupervisorComponent implements OnInit {
  logos: { nombre: string, logo: string }[] = []; // Array para almacenar los nombres y URLs de las imágenes

  constructor(private authService: AuthService, private router: Router) {}
  escuelaLogo = '';

  ngOnInit() {
    this.authService.logo$.subscribe(logo => {
      this.escuelaLogo = logo;
    });

    this.loadLogos();
  }

  loadLogos() {
    this.authService.getEscuelas_supervisor().subscribe(
      (escuelas) => {
        escuelas.forEach((escuela) => {
          this.authService.getEscuelaPorNombre(escuela.escuela).subscribe(
            (data) => {
              if (data.logo) {
                // Verificar si el logo es una URL directa o un nombre de archivo
                if (data.logo.startsWith('http') || data.logo.startsWith('https')) {
                  this.logos.push({ nombre: escuela.escuela, logo: data.logo });
                } else {
                  const logoObservable = this.authService.getlogofile(data.logo); // Obtener el observable de la imagen
                  this.convertBlobToUrl(logoObservable).then((logoUrl) => {
                    if (logoUrl) {
                      this.logos.push({ nombre: escuela.escuela, logo: logoUrl });
                    }
                  });
                }
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

  async convertBlobToUrl(blobObservable: Observable<Blob>): Promise<string | null> {
    const blob = await blobObservable.toPromise();
    if (blob) {
      return URL.createObjectURL(blob);
    } else {
      console.error('Error: Blob is undefined');
      return null;
    }
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