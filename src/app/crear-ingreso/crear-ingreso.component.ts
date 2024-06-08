import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-crear-ingreso',
  templateUrl: './crear-ingreso.component.html', 
  styleUrl: './crear-ingreso.component.css'
})
export class CrearIngresoComponent implements OnInit {
  ingresos = {
    school_name: '',
    category: '',
    otros_especificar: '',
    amount: '',
    user_register: '',
  };

  errorMessage: string = '';
  
  cbingresos: any = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.ingresos.school_name = localStorage.getItem('escuela') || '';
    this.ingresos.user_register = localStorage.getItem('username') || '';
    this.loadincomecombobox();
  }

  checkCategory() {
    if (this.ingresos.category.toLowerCase() !== 'otros') {
      this.ingresos.otros_especificar = '';
    }
  }

  onSubmit() {
    this.authService.crearingreso(this.ingresos).subscribe(
      (response) => {
        console.log('ingreso creada:', response);
        this.router.navigate(['/iysine']);
      },
      (error) => {
        console.error('Error al crear ingreso:', error);
        this.errorMessage = 'Datos incorrectos o repetidos';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
  }

  loadincomecombobox() {
    this.authService.getCategoriaingreso().subscribe(
      (response) => {
        console.log('egresos:', response);
        this.cbingresos = response;
        console.log('cbingresos:', this.cbingresos);
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