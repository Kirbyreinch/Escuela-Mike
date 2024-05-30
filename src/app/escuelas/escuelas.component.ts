import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModificarEscuelaComponent } from '../modificar-escuela/modificar-escuela.component';
import { EliminarEscuelasComponent } from '../eliminar-escuelas/eliminar-escuelas.component';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrl: './escuelas.component.css'
})
export class EscuelasComponent implements OnInit {
  escuelas: any[] = [];
  escuelasOriginal: any[] = [];
  filtro: string = '';
  filtroSeleccionado: string = 'escuela';  // Cambiado a 'escuela' para coincidir con la opción en el HTML

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadEscuelas();  // Asegúrate de que el nombre del método sea consistente
  }

  loadEscuelas(): void {  // Ajuste de estilo de nomenclatura
    this.authService.getEscuelas().subscribe(
      (escuela) => {
        this.escuelas = [escuela];  // Convertir el objeto en un array con un solo elemento
        this.escuelasOriginal = [escuela];  // Convertir el objeto en un array con un solo elemento
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
          return escuela.nombre.toLowerCase().startsWith(filtroMinusculas);  // Asegúrate de que la propiedad sea 'nombre'
        default:
          return true;
      }
    });
  }

  openConfirmationDialog(school: any): void {
    console.log('Escuela seleccionada:', school);
    const dialogRef = this.dialog.open(EliminarEscuelasComponent, {
      width: '400px',
      data: { school }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarEscuela(school);  
      }
    });
  }

  eliminarEscuela(school: string): void {
    this.authService.eliminarescuela(school).subscribe(
      () => {
        console.log('Escuela eliminada exitosamente');
        this.escuelas = this.escuelas.filter(escuela => escuela.nombre !== school);
      },
      (error) => {
        console.error('Error al eliminar la escuela', error);
      }
    );
  }


  openModificarEscuela(escuela: any): void {
    const dialogRef = this.dialog.open(ModificarEscuelaComponent, {
      width: '400px',
      data: { escuela: escuela.id }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadEscuelas();  // Recargar la lista de escuelas después de modificar
      }
    });
  }
}