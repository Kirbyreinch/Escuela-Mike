import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-egreso',
  templateUrl: './crear-egreso.component.html', 
  styleUrl: './crear-egreso.component.css'
})
export class CrearEgresoComponent implements OnInit {
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

  ngOnInit() {
    // Recuperar valores del localStorage
    const escuela = localStorage.getItem('escuela');
    const user_register = localStorage.getItem('username');
    
    if (escuela && user_register) {
      this.egresos.escuela_nombre = escuela;
      this.egresos.user_register = user_register;
    } else {
      this.errorMessage = 'Error: No se pudieron cargar los datos del usuario o escuela';
    }
  }

  onSubmit() {
    this.authService.crearegreso(this.egresos).subscribe(
      (response) => {
        console.log('egreso creado:', response);
        // Después de crear el egreso, registrar el archivo
        this.registrarArchivo();
      },
      (error) => {
        console.error('Error al crear egreso:', error);
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  registrarArchivo() {
    this.authService.ArchivoEgreso(this.Files.id_expense, this.Files.file).subscribe(
      (response) => {
        console.log('archivo creado:', response);
        // Navegar a la página deseada después de completar el registro del archivo
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