import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent implements OnInit {
  usuario = {
    name: '',
    last_name: '',
    email: '',
    tel: '',
    escuela: '' // Deja este campo vacío por defecto
  };
  rol: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Obtener la escuela del almacenamiento local y asignarla al campo de entrada de la escuela
    const escuelaLocalStorage = localStorage.getItem('escuela');
    if (escuelaLocalStorage) {
      this.usuario.escuela = escuelaLocalStorage;
    }
  }


  onSubmit() {


    if (!this.usuario.name || !this.usuario.email || !this.password || !this.rol) {
      let errorMessage = 'Por favor, complete los siguientes campos obligatorios:';
      if (!this.usuario.name) {
        errorMessage += ' Nombre,';
      }
      if (!this.usuario.email) {
        errorMessage += ' Correo electrónico,';
      }
      if (!this.password) {
        errorMessage += ' Contraseña,';
      }
      if (!this.rol) {
        errorMessage += ' Rol institucional,';
      }
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return; // Detiene la ejecución si los campos obligatorios están vacíos
    }
    
    // Verificar que los campos obligatorios estén llenos
    if (!this.usuario.name || !this.usuario.email || !this.password || !this.rol) {
      this.errorMessage = 'Por favor, complete los campos obligatorios.';
      return;
    }
  
    this.authService.crearUsuario(this.usuario, this.rol, this.password).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/user']);
      },
      (error) => {
        console.error('Error al crear usuario:', error);
        if (error.status === 400) {
          // Si la API devuelve un error 400 (Bad Request), se maneja el mensaje de error de la API
          if (error.error && error.error.detail) {
            this.errorMessage = error.error.detail;
          } else {
            this.errorMessage = 'Error: ' + error.statusText;
          }
        } else if (error.status === 409) {
          // Si la API devuelve un error 409 (Conflict), se maneja el caso del rol ya está en uso
          this.errorMessage = 'El rol seleccionado ya está en uso.';
        } else {
          // Otros errores de la API
          this.errorMessage = 'Error al crear usuario. Por favor, inténtelo de nuevo.';
        }
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

}