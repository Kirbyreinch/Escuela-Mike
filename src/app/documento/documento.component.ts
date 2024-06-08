import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html', 
  styleUrl: './documento.component.css'
})
export class DocumentoComponent {
  documen = {
    doc_name: '',
    school: '',
    start_year: '',
    end_year: '',

  };



  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.documen.school = localStorage.getItem('escuela') || '';
  }

 
  onSubmit() {
    // Obtener la escuela del localStorage
    const school = localStorage.getItem('escuela') || '';
  
    // Agregar la escuela al objeto documen
    this.documen.school = school;
  
    this.authService.crearPDF(this.documen).subscribe(
      (response) => {
        console.log('documento creado:', response);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        console.error('Error al crear documento:', error);
        this.errorMessage = 'Error al crear documento';
        setTimeout(() => {
          this.errorMessage = '';
        }, 2000);
      }
    );
}
}