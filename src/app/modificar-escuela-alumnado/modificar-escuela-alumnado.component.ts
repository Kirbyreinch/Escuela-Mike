import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-escuela-alumnado',
  templateUrl: './modificar-escuela-alumnado.component.html',
  styleUrl: './modificar-escuela-alumnado.component.css'
})
export class ModificarEscuelaAlumnadoComponent {
  nuevo_NoFamilia: string = '';
  nuevo_Cuota: string = '';
  nuevo_TTAlumnos: string = '';
  nuevo_TTGrupos: string = '';
  nuevo_Turno: string = '';
  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModificarEscuelaAlumnadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    if (data && data.escuela) {
      this.nuevo_NoFamilia = data.escuela.no_familia || '';
      this.nuevo_Cuota = data.escuela.cuota || '';
      this.nuevo_TTAlumnos = data.escuela.tt_alumnos || '';
      this.nuevo_TTGrupos = data.escuela.tt_grupos || '';
      this.nuevo_Turno = data.escuela.turno || '';
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const escuela_nombre = this.data.escuela.nombre;
    const escuelaModificado = {
      escuela_nombre: escuela_nombre,
      NoFamilia: this.nuevo_NoFamilia,
      Cuota: this.nuevo_Cuota,
      TTAlumnos: this.nuevo_TTAlumnos,
      TTGrupos: this.nuevo_TTGrupos,
      Turno: this.nuevo_Turno
    };

    console.log('Datos que se enviarán:', escuelaModificado);

    this.authService.modificaralumnado(
      escuela_nombre,
      this.nuevo_NoFamilia,
      this.nuevo_Cuota,
      this.nuevo_TTAlumnos,
      this.nuevo_TTGrupos,
      this.nuevo_Turno
    ).subscribe(
      (response) => {
        console.log('alumnado modificado:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al modificar el alumnado:', error);
        this.errorMessage = 'Error al actualizar el alumnado';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}