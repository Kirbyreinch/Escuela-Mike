import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-escuela',
  templateUrl: './modificar-escuela.component.html',
  styleUrl: './modificar-escuela.component.css'
})
export class ModificarEscuelaComponent {
  nuevoname: string = ''; 


  constructor(
    public dialogRef: MatDialogRef<ModificarEscuelaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.nuevoname = data.newname;
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const school = String(this.data.school); // Convertir a string
    const usuarioModificado = {
      school: school,
      newname: this.nuevoname,

    };

    console.log('Datos que se enviarán:', usuarioModificado);

    this.authService.modificarEscuela(school, this.nuevoname).subscribe(
      (response) => {
        console.log('Escuela modificado:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al modificar el usuario:', error);
      }
    );
  }
}