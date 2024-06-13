import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModificarEscuelaComponent } from '../modificar-escuela/modificar-escuela.component';
import { EliminarEscuelasComponent } from '../eliminar-escuelas/eliminar-escuelas.component';
import { ModificarEscuelaAlumnadoComponent } from '../modificar-escuela-alumnado/modificar-escuela-alumnado.component';
import { ModificarEscuelaLocalizacionComponent } from '../modificar-escuela-localizacion/modificar-escuela-localizacion.component';
import { Router } from '@angular/router';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';


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
  successMessage: string = ''; // Añadido para el mensaje de éxito

  usuarios: any[] = [];
  usuariosOriginal: any[] = [];


  constructor(private authService: AuthService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state && navigation.extras.state['mensaje']) {
      this.successMessage = navigation.extras.state['mensaje'];
      setTimeout(() => {
        this.successMessage = '';
      }, 3000); // Mostrar el mensaje por 3 segundos
    }

    this.loadEscuelas();
  }

  loadEscuelas(): void {
    this.authService.getEscuelas_supervisor().subscribe(
      (escuelas) => {
        this.escuelas = escuelas;  // No envolver en un array
        this.escuelasOriginal = escuelas;  // No envolver en un array
        this.loadDirectores();
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



  loadDirectores(): void {
    this.escuelas.forEach((escuela) => {
      this.authService.getDirectoresPorEscuela(escuela.escuela).subscribe(
        (directores) => {
          const directoresDirector = directores.filter((director) => director.rol === 'director');
          const nombreDirector = directoresDirector.length > 0 ? directoresDirector[0].name : 'N/A';
          const usernameDirector = directoresDirector.length > 0 ? directoresDirector[0].username : 'N/A';
          const iddirector = directoresDirector.length > 0 ? directoresDirector[0].id : 'N/A';
          escuela.director = nombreDirector;
          escuela.username = usernameDirector;
          escuela.id = iddirector;
        },
        (error) => {
          console.error(`Error al obtener los directores de ${escuela.escuela}`, error);
        }
      );
    });
  }





  openConfirmationDialog(user_id: string) {
    console.log('user_id seleccionado:', user_id);
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '400px',
      data: { user_id }
    });
  
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarUsuario(user_id);
      }
    });
  }


  
  eliminarUsuario(user_id: string) {
    this.authService.eliminarUsuario(user_id).subscribe(
      () => {
        console.log('Usuario eliminado exitosamente');
        this.usuarios = this.usuarios.filter(usuario => usuario.id !== user_id);
        this.loadEscuelas();
        this.loadDirectores();
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }

}