import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrl: './modificar-usuario.component.css'
})
export class ModificarUsuarioComponent {
  nuevoname: string = ''; 
  nuevolast_name: string = ''; 
  nuevoemail: string = ''; 
  nuevotel: string = ''; 
  nuevoescuela: string = ''; 
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModificarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.nuevoname = data.name;
    this.nuevolast_name = data.last_name;
    this.nuevoemail = data.email;
    this.nuevotel = data.tel;
    this.nuevoescuela = data.escuela;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const id = String(this.data.id); // Convertir a string
    const usuarioModificado = {
      id: id,
      name: this.nuevoname,
      last_name: this.nuevolast_name,
      email: this.nuevoemail,
      tel: this.nuevotel,
      escuela: this.nuevoescuela
    };

    console.log('Datos que se enviarán:', usuarioModificado);

    this.authService.modificarUsuario(id, this.nuevoname, this.nuevolast_name, this.nuevoemail, this.nuevotel, this.nuevoescuela).subscribe(
      (response) => {
        console.log('Usuario modificado:', response);
        this.dialogRef.close(response);
      },
  (error) => {
        console.error('Error al modificar el usuario:', error);
        this.errorMessage = 'Error al actualizar el usuario'; // Mensaje de error
        setTimeout(() => {
          this.errorMessage = ''; 
        }, 2000); 
      }
    );
  }
}