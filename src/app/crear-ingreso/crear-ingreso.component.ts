import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-ingreso',
  templateUrl: './crear-ingreso.component.html', 
  styleUrl: './crear-ingreso.component.css'
})
export class CrearIngresoComponent {
  ingresos = {
    school_name: '',
    category: '',
    otros_especificar: '',
    amount: '',
    user_register: '',
  };

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.crearingreso(this.ingresos).subscribe(
      (response) => {
        console.log('ingreso creada:', response);
        this.router.navigate(['/iye']);
      },
      (error) => {
        console.error('Error al crear ingreso:', error);
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}