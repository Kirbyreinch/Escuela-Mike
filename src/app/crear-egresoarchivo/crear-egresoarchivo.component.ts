import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-egresoarchivo',
  templateUrl: './crear-egresoarchivo.component.html',
  styleUrl: './crear-egresoarchivo.component.css'
})
export class CrearEgresoarchivoComponent {
  egresos = {
    escuela_nombre: '',
    category: '',
    monto: '',
    user_register: '',
  };

  Files = {
    id_expense: '',
    file: '',
  };


  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {

    this.authService.ArchivoEgreso(this.Files.id_expense,this.Files.file).subscribe(
      (response) => {
        console.log('archivo creado:', response);
        this.router.navigate(['/iye']);
      },
      (error) => {
        console.error('Error al crear archivo:', error);
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );


  }




}