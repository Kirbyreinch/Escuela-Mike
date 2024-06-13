import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Reiniciar localStorage al iniciar el componente
    localStorage.clear();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.authService.login(username, password).subscribe(
        response => {
          // Verifica el contenido de la respuesta
          console.log('API response:', response);

          // Guardar datos comunes en localStorage
          localStorage.setItem('username', username);
          localStorage.setItem('id', response.id.toString());
          localStorage.setItem('rol', response.rol);

          // Guardar datos específicos de 'director' en localStorage
          if (response.escuela) {
            localStorage.setItem('escuela', response.escuela);
            this.authService.getEscuelaByNombre(response.escuela).subscribe(
              (escuelaResponse) => {
                this.authService.updateLogo(escuelaResponse.logo);
              },
              (error) => {
                console.error('Error al obtener los datos de la escuela', error);
              }
            );
          }

          // Verifica el rol del usuario y navega a la ruta correspondiente
          if (response.rol === 'supervisor') {
            this.router.navigate(['/supervisor']);
          } else {
            this.router.navigate(['/inicio']);
          }
        },
        error => {
          console.error('Error al iniciar sesión', error);
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 2000);
        }
      );
    } else {
      console.warn('Formulario no válido');
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
    }
  }
}