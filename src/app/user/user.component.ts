import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { ModificarUsuarioComponent } from '../modificar-usuario/modificar-usuario.component';
import { ModificarUsuariorolComponent } from '../modificar-usuariorol/modificar-usuariorol.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  usuarios: any[] = [];
  usuariosOriginal: any[] = [];
  filtro: string = '';
  filtroSeleccionado: string = 'id';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.authService.getusuariosPorEscuela().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosOriginal = [...usuarios];
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }

  // Función para aplicar el filtro
  aplicarFiltro() {
    // Convertir el filtro a minúsculas para una comparación sin distinción entre mayúsculas y minúsculas
    const filtroMinusculas = this.filtro.toLowerCase();
    // Filtrar la lista de usuarios original según la opción seleccionada del combo box y el texto ingresado en la barra de búsqueda
    this.usuarios = this.usuariosOriginal.filter(usuario => {
      switch (this.filtroSeleccionado) {
        case 'id':
          return usuario.id.toString().toLowerCase().startsWith(filtroMinusculas);
        case 'rol':
          return usuario.rol.toString().toLowerCase().startsWith(filtroMinusculas);
        case 'escuela':
          return usuario.escuela.toString().toLowerCase().startsWith(filtroMinusculas);
        default:
          return true; // Retornar true por defecto para mantener todos los elementos si no se selecciona ninguna opción válida
      }
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
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }



  openModificarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(ModificarUsuarioComponent, {
      width: '400px',
      data: {
        id: usuario.id,
        name: usuario.name,
        last_name: usuario.last_name,
        email: usuario.email,
        tel: usuario.tel,
        escuela: usuario.escuela
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios(); // Recargar la lista de usuarios después de modificar
      }
    });
  }


  openModificarUsuariorol(usuario: any) {
    console.log('Username seleccionado:', usuario.username); // Agrega este console.log()
    const dialogRef = this.dialog.open(ModificarUsuariorolComponent, {
      width: '400px',
      data: {
        username: usuario.username,
        rol: usuario.rol
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios(); // Recargar la lista de usuarios después de modificar
      }
    });
  }









}