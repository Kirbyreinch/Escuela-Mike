import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router'; // Importa ActivatedRoute
import { FormsModule } from '@angular/forms';  // Importa FormsModule
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Importa HttpClient y HttpHeaders

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
    NoFamilia: 0,  
    Cuota: 0,     
    TTAlumnos: 0, 
    TTGrupos: 0,   
    Turno: 'Matutino'
  };

  nombre: string = '';
  logo: File | null = null; // Cambia el tipo de logo
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}

  onSubmit() {
    // Verifica si los campos obligatorios están llenos
    if (
      !this.nombre ||  
      !this.usuario.clave || !this.usuario.domicilio ||
      !this.usuario.localidad || !this.usuario.zona || !this.usuario.sector
    ) {
      let errorMessage = 'Por favor, complete los siguientes campos obligatorios:';
      if (!this.nombre) {
        errorMessage += ' Nombre,';
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

    // Crear la escuela sin logo
    const requestData = {
      detalle_request: this.usuario,
      extra_request: this.extra
    };
    
    this.authService.crearEscuela(requestData, this.nombre).subscribe(
      (response) => {
        console.log('Escuela creada:', response);
        
        // Si se seleccionó un logo, subirlo
        if (this.logo) {
          this.uploadLogo(this.logo, this.nombre);
        } else {
          this.router.navigate(['/supervisor_escuelas']);
        }
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

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.logo = event.target.files[0];
    }
  }

  uploadLogo(file: File, schoolName: string) {
    const formData = new FormData();
    formData.append('logo', file);

    this.authService.crearlogo(schoolName, formData).subscribe(
      (response) => {
        console.log('Logo subido:', response);
        this.router.navigate(['/supervisor_escuelas']);
      },
      (error) => {
        console.error('Error al subir logo:', error);
        this.errorMessage = 'Error al subir el logo';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}