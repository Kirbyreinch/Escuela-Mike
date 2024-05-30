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
    identificador: 'egr'  // Establecer el valor predeterminado del identificador
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}