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
    // Verifica si los campos obligatorios están llenos
    if (
      !this.nombre || !this.logo || 
      !this.usuario.clave || !this.usuario.domicilio ||
      !this.usuario.localidad || !this.usuario.zona || !this.usuario.sector
    ) {
      let errorMessage = 'Por favor, complete los siguientes campos obligatorios:';
      if (!this.nombre) {
        errorMessage += ' Nombre,';
      }
      if (!this.logo) {
        errorMessage += ' Logo,';
      }
      if (!this.usuario.clave) {
        errorMessage += ' Clave,';
      }
      if (!this.usuario.domicilio) {
        errorMessage += ' Domicilio,';
      }
      if (!this.usuario.localidad) {
        errorMessage += ' Localidad,';
      }
      if (!this.usuario.zona) {
        errorMessage += ' Zona,';
      }
      if (!this.usuario.sector) {
        errorMessage += ' Sector,';
      }
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return; // Detiene la ejecución si los campos obligatorios están vacíos
    }
  
    const requestData = {
      detalle_request: this.usuario,
      extra_request: this.extra
    };
    
    this.authService.crearEscuela(requestData, this.nombre, this.logo).subscribe(
      (response) => {
        console.log('Escuela creada:', response);
        this.router.navigate(['/supervisor_escuelas']);
      },
      (error) => {
        console.error('Error al crear escuela:', error);
        if (error.error && error.error.detail) {
          this.errorMessage = error.error.detail;
        } else {
          this.errorMessage = 'Error: ' + error.statusText;
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}