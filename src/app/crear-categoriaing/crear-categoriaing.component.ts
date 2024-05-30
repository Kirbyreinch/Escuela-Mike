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
    identificador: 'ing'  // Establecer el valor predeterminado del identificador
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

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
        this.errorMessage = 'Datos incorrectos o inválidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}