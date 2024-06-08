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

          // Verifica si response es un array y contiene los campos esperados
          if (Array.isArray(response) && response.length > 0) {
            const userData = response[0];
            if (typeof userData.id === 'number' && typeof userData.rol === 'string' && typeof userData.escuela === 'string') {
              localStorage.setItem('username', username);
              localStorage.setItem('password', password);
              localStorage.setItem('id', userData.id.toString());
              localStorage.setItem('rol', userData.rol);
              localStorage.setItem('escuela', userData.escuela);

              // Update the AuthService with the new data
              this.authService.updateUsername(username);

              this.authService.getEscuelaByNombre(userData.escuela).subscribe(
                (response) => {
                  this.authService.updateLogo(response.logo);
                },
                (error) => {
                  console.error('Error al obtener los datos de la escuela', error);
                }
              );

              // Navega a la ruta de inicio en caso de éxito
              this.router.navigate(['/inicio']);
            } else {
              console.error('Response does not have expected fields');
              this.loginError = true;
              setTimeout(() => {
                this.loginError = false;
              }, 2000);
            }
          } else {
            console.error('Response is not an array or empty');
            this.loginError = true;
            setTimeout(() => {
              this.loginError = false;
            }, 2000);
          }
        },
        error => {
          // Maneja el error (puedes mostrar un mensaje al usuario)
          console.error('Error al iniciar sesión', error);
          this.loginError = true;
          setTimeout(() => {
            this.loginError = false;
          }, 2000);
        }
      );
    } else {
      // Maneja el caso donde el formulario no es válido
      console.warn('Formulario no válido');
      this.loginError = true;
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
    }
  }
}