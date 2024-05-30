import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-usuariorol',
  templateUrl: './modificar-usuariorol.component.html',
  styleUrl: './modificar-usuariorol.component.css'
})
export class ModificarUsuariorolComponent {
  nuevorol: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModificarUsuariorolComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.nuevorol = data.rol;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const username = this.data.username;
    const usuarioModificado = { username: username, rol: this.nuevorol };

    console.log('Datos que se enviarán:', usuarioModificado);

    this.authService.modificarUsuariorol(username, this.nuevorol).subscribe(
      (response) => {
        console.log('Usuario modificado:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al modificar el usuario:', error);
        this.errorMessage = 'Error al actualizar el usuario, rol en uso'; // Mensaje de error
        setTimeout(() => {
          this.errorMessage = ''; 
        }, 2000); 
      }
    );
  }
}