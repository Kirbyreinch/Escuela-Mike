import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css'
})
export class CrearCategoriaComponent {
  categoriasegr = {
    id: 0,  // Establecer el id predeterminado a 0
    nombre: '',
    identificador: 'egr', // Establecer el valor predeterminado del identificador
    escuela_nombre: ''
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {
    const storedEscuela = localStorage.getItem('escuela');
    if (storedEscuela) {
      this.categoriasegr.escuela_nombre = storedEscuela;
    }
  }



  
  
  onSubmit() {
    // Asegurarse de que el identificador tenga el valor correcto
    this.categoriasegr.identificador = 'egr';

    this.authService.crearCategoriaegr(this.categoriasegr).subscribe(
      (response) => {
        console.log('Categoria creada:', response);
        this.router.navigate(['/categorias']);
      },
      (error) => {
        console.error('Error al crear categoria:', error);
        if (error.status === 400 && error.error && error.error.detail) {
          this.errorMessage = error.error.detail; // Asignar el mensaje de error de la API
        } else {
          this.errorMessage = 'Datos incorrectos o repetidos'; // Mensaje genérico
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000); // Limpiar el mensaje después de 5 segundos
      }
    );
  }
}