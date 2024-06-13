import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ModificarDatosSupervisorComponent } from '../modificar-datos-supervisor/modificar-datos-supervisor.component';



@Component({
  selector: 'app-datos-supervisor',
  templateUrl: './datos-supervisor.component.html', 
  styleUrl: './datos-supervisor.component.css'
})
export class DatosSupervisorComponent {
  usuarios: any[] = [];
  usuariosOriginal: any[] = [];
  filtro: string = '';
  filtroSeleccionado: string = 'id';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios() {
    this.authService.getsupervisor().subscribe(
      (usuarios) => {
        this.usuarios = usuarios;
        this.usuariosOriginal = [...usuarios];
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }



  openModificarUsuario(usuario: any) {
    const dialogRef = this.dialog.open(ModificarDatosSupervisorComponent, {
      width: '400px',
      data: {

        username: usuario.username,
        name: usuario.name,
        password: usuario.password,
        estado: usuario.estado,

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadUsuarios(); // Recargar la lista de usuarios después de modificar
      }
    });
  }


  



}