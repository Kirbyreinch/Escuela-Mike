import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-categoria',
  templateUrl: './modificar-categoria.component.html',
  styleUrl: './modificar-categoria.component.css'
})
export class ModificarCategoriaComponent {
  nombre: string = ''; 
  tipo: string = ''; 
  
  nuevoNombre: string = ''; // Nuevo nombre ingresado
  nuevoIdentificador: string = ''; // Nuevo identificador ingresado

  constructor(
    public dialogRef: MatDialogRef<ModificarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.nombre = data.nombre;
    this.tipo = data.identificador;

    this.nuevoNombre = data.nombre; // Asignar el nombre actual a nuevoNombre
    this.nuevoIdentificador = data.identificador; // Asignar el identificador actual a nuevoIdentificador


  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const categoriaModificada = {
      id: 0, // Usado como ejemplo, ajusta según sea necesario
      nuevoNombre: this.nuevoNombre,
      nuevoIdentificador: this.nuevoIdentificador
    };

    console.log('Datos actuales:', { nombre: this.nombre, tipo: this.tipo });
    console.log('Datos que se enviarán:', categoriaModificada);

    this.authService.modificarCategoria(this.nombre, this.tipo, 0, this.nuevoNombre, this.nuevoIdentificador).subscribe(
      (response) => {
        console.log('Categoría modificada:', response);
        this.dialogRef.close(response);
      },
      (error) => {
        console.error('Error al modificar la categoría:', error);
      }
    );
  }
}