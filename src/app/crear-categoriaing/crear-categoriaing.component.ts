import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoriaing',
  templateUrl: './crear-categoriaing.component.html',
  styleUrl: './crear-categoriaing.component.css'
})
export class CrearCategoriaingComponent {
  categorias = {
    id: 0,  // Establecer el id predeterminado a 0
    nombre: '',
    identificador: 'ing', // Establecer el valor predeterminado del identificador
    escuela_nombre: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    // Obtener la escuela del almacenamiento local


    const storedEscuela = localStorage.getItem('escuela');
    if (storedEscuela) {
      this.categorias.escuela_nombre = storedEscuela;
    }
  }

  onSubmit() {
    // Asegurarse de que el identificador tenga el valor correcto
    this.categorias.identificador = 'ing';

    this.authService.crearCategoria(this.categorias).subscribe(
      (response) => {
        console.log('Categoria creada:', response);
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error('Error al crear categoria:', error);
        if (error.status === 400 && error.error && error.error.detail) {
          this.errorMessage = error.error.detail; // Asignar el mensaje de error de la API
        } else {
          this.errorMessage = 'Datos incorrectos o inválidos'; // Mensaje genérico
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000); // Limpiar el mensaje después de 5 segundos
      }
    );
  }
}