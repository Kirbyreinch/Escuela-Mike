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

  selectedFile: File | null = null;
  cbegresos: any = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Recuperar valores del localStorage
    const escuela = localStorage.getItem('escuela');
    const user_register = localStorage.getItem('username');

    if (escuela && user_register) {
      this.egresos.escuela_nombre = escuela;
      this.egresos.user_register = user_register;
      this.loadexpensescombobox();
    } else {
      this.errorMessage = 'Error: No se pudieron cargar los datos del usuario o escuela';
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    this.authService.crearegreso(this.egresos).subscribe(
      (response) => {
        console.log('egreso creado:', response);
        this.fetchAndLogLastEgreso(); // Llamar a la función para obtener el último egreso
        this.router.navigate(['/iye']);

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

  fetchAndLogLastEgreso() {
    this.authService.getegreso().subscribe(
      (egresos) => {
        const ultimoEgreso = egresos[0]; // Asumimos que el último egreso es el primero en la lista
        console.log('ID del egreso creado:', ultimoEgreso.id);
        if (this.selectedFile) {
          this.uploadFile(ultimoEgreso.id, this.selectedFile);
        } else {
          console.error('No se seleccionó ningún archivo');
        }
      },
      (error) => {
        console.error('Error al obtener los egresos:', error);
        this.errorMessage = 'Error al obtener los egresos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  uploadFile(id_expense: number, file: File) {
    this.authService.uploadFile(id_expense, file).subscribe(
      (response) => {
        console.log('Archivo subido exitosamente:', response);
        this.router.navigate(['/iye']);
      },
      (error) => {
        console.error('Error al subir el archivo:', error);
        this.errorMessage = 'Error al subir el archivo';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  loadexpensescombobox() {
    this.authService.getCategoriaegreso().subscribe(
      (response) => {
        console.log('egresos:', response);
        this.cbegresos = response;
      },
      (error) => {
        console.error('Error al cargar egresos:', error);
        this.errorMessage = 'Error al cargar egresos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }
}