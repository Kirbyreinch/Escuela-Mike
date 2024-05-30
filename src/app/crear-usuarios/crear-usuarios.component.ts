import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-usuarios',
  templateUrl: './crear-usuarios.component.html',
  styleUrl: './crear-usuarios.component.css'
})
export class CrearUsuariosComponent {
  usuario = {
    name: '',
    last_name: '',
    email: '',
    tel: '',
    escuela: ''
  };
  rol: string = '';
  password: string = '';
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.crearUsuario(this.usuario, this.rol, this.password).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        this.router.navigate(['/user']);
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