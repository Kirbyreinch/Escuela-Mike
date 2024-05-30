import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { FormsModule } from '@angular/forms';  // Importa FormsModule

@Component({
  selector: 'app-crear-escuela',
  templateUrl: './crear-escuela.component.html',
  styleUrl: './crear-escuela.component.css'
})
export class CrearEscuelaComponent {
  usuario = {
    clave: '',
    domicilio: '',
    localidad: '',
    zona: '',
    sector: '',
    telefono: ''
  };

  extra = {
    NoFamilia: 0,  // Inicializa como un número
    Cuota: 0,      // Inicializa como un número
    TTAlumnos: 0,  // Inicializa como un número
    TTGrupos: 0,   // Inicializa como un número
    Turno: 'Matutino'
  };

  nombre: string = '';
  logo: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {


    const requestData = {
      detalle_request: this.usuario,
      extra_request: this.extra
    };
    
    this.authService.crearEscuela(requestData, this.nombre, this.logo).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/escuelas']);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        this.errorMessage = 'Datos incorrectos o inválidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}