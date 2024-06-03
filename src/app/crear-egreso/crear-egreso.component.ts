import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-egreso',
  templateUrl: './crear-egreso.component.html', 
  styleUrl: './crear-egreso.component.css'
})
export class CrearEgresoComponent {
  egresos = {
    escuela_nombre: '',
    category: '',
    monto: '',
    user_register: '',
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.crearegreso(this.egresos).subscribe(
      (response) => {
        console.log('egresos creada:', response);
        this.router.navigate(['/iye']);
      },
      (error) => {
        console.error('Error al crear egresos:', error);
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}