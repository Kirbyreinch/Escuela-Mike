import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-usuarios-supervisor',
  templateUrl: './crear-usuarios-supervisor.component.html',
  styleUrl: './crear-usuarios-supervisor.component.css'
})
export class CrearUsuariosSupervisorComponent implements OnInit {
  usuario = {
    name: '',
    last_name: '',
    email: '',
    tel: '',
    escuela: ''
  };
  rol: string = 'director';  // Asigna el rol como "director" de manera predeterminada
  password: string = '';
  errorMessage: string = '';
  escuelas: any[] = [];  // Lista de escuelas

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadEscuelas();  // Cargar la lista de escuelas cuando se inicializa el componente
  }

  loadEscuelas() {
    this.authService.getEscuelas_supervisor().subscribe(
      (data) => {
        this.escuelas = data;
      },
      (error) => {
        console.error('Error al cargar las escuelas', error);
      }
    );
  }

  onSubmit() {
    // Verifica si los campos obligatorios (nombre, correo electrónico y contraseña) están llenos
    if (!this.usuario.name || !this.usuario.email || !this.password || !this.usuario.escuela) {
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
      if (!this.usuario.escuela) {
        errorMessage += ' Escuela,';
      }
      this.errorMessage = errorMessage;
      setTimeout(() => {
        this.errorMessage = '';
      }, 2000);
      return; // Detiene la ejecución si los campos obligatorios están vacíos
    }

    this.authService.crearUsuario(this.usuario, this.rol, this.password).subscribe(
      (response) => {
        console.log('Usuario creado:', response); // Aquí se registra la respuesta de la API
        const mensaje = response.mensaje;
        this.router.navigate(['/supervisor_escuelas'], { state: { mensaje } });
      },
      (error) => {
        console.error('Error al crear usuario:', error);
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