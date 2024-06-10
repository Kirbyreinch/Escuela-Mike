import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModificarEscuelaComponent } from '../modificar-escuela/modificar-escuela.component';
import { EliminarEscuelasComponent } from '../eliminar-escuelas/eliminar-escuelas.component';
import { ModificarEscuelaAlumnadoComponent } from '../modificar-escuela-alumnado/modificar-escuela-alumnado.component';
import { ModificarEscuelaLocalizacionComponent } from '../modificar-escuela-localizacion/modificar-escuela-localizacion.component';

@Component({
  selector: 'app-escuelas-supervisor',
  templateUrl: './escuelas-supervisor.component.html',
  styleUrl: './escuelas-supervisor.component.css'
})
export class EscuelasSupervisorComponent implements OnInit {
  escuelas: any[] = [];
  escuelasOriginal: any[] = [];
  filtro: string = '';
  filtroSeleccionado: string = 'escuela';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEscuelas();
  }

  loadEscuelas(): void {
    this.authService.getEscuelas_supervisor().subscribe(
      (escuelas) => {
        this.escuelas = escuelas;  // No envolver en un array
        this.escuelasOriginal = escuelas;  // No envolver en un array
      },
      (error) => {
        console.error('Error al obtener la lista de escuelas', error);
      }
    );
  }

  aplicarFiltro(): void {
    const filtroMinusculas = this.filtro.toLowerCase();
    this.escuelas = this.escuelasOriginal.filter(escuela => {
      switch (this.filtroSeleccionado) {
        case 'escuela':
          return escuela.escuela.toLowerCase().startsWith(filtroMinusculas);
        default:
          return true;
      }
    });
  }

  eliminarEscuela(escuela: string): void {
    this.authService.eliminarescuela(escuela).subscribe(
      () => {
        console.log('Escuela eliminada exitosamente');
        this.escuelas = this.escuelas.filter(e => e.escuela !== escuela);
      },
      (error) => {
        console.error('Error al eliminar la escuela', error);
      }
    );
  }
}