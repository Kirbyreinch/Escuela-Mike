import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-escuela-localizacion',
  templateUrl: './modificar-escuela-localizacion.component.html',
  styleUrl: './modificar-escuela-localizacion.component.css'
})
export class ModificarEscuelaLocalizacionComponent {
  nuevo_clave: string = '';
  nuevo_domicilio: string = '';
  nuevo_localidad: string = '';
  nuevo_zona: string = '';
  nuevo_sector: string = '';
  nuevo_telefono: string = '';

  errorMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<ModificarEscuelaLocalizacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    if (data && data.escuela) {
      this.nuevo_clave = data.escuela.clave || '';
      this.nuevo_domicilio = data.escuela.domicilio || '';
      this.nuevo_localidad = data.escuela.localidad || '';
      this.nuevo_zona = data.escuela.zona || '';
      this.nuevo_sector = data.escuela.sector || '';
      this.nuevo_telefono = data.escuela.telefono || '';
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const escuela_nombre = this.data.escuela.nombre;
    const escuelaModificado = {
      escuela_nombre: escuela_nombre,
      clave: this.nuevo_clave,
      domicilio: this.nuevo_domicilio,
      localidad: this.nuevo_localidad,
      zona: this.nuevo_zona,
      sector: this.nuevo_sector,
      telefono: this.nuevo_telefono
    };

    console.log('Datos que se enviarán:', escuelaModificado);

    this.authService.modificarLocalizacion(
      escuela_nombre,
      this.nuevo_clave,
      this.nuevo_domicilio,
      this.nuevo_localidad,
      this.nuevo_zona,
      this.nuevo_sector,
      this.nuevo_telefono 



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