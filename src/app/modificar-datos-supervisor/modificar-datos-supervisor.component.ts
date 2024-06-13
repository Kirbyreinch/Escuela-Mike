import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-modificar-datos-supervisor',
  templateUrl: './modificar-datos-supervisor.component.html', 
  styleUrl: './modificar-datos-supervisor.component.css'
})
export class ModificarDatosSupervisorComponent {
  nuevousername: string = ''; 
  nuevoname: string = ''; 
  nuevopassword: string = ''; 
  nuevoestado: string = ''; 
  errorMessage: string = '';


  constructor(
    public dialogRef: MatDialogRef<ModificarDatosSupervisorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    this.nuevousername = data.username;
    this.nuevoname = data.name;
    this.nuevopassword = data.password;
    this.nuevoestado = data.estado;

  }

  cancelar(): void {
    this.dialogRef.close();
  }

  confirmar(): void {
    const usuarioModificado = {
      username: this.nuevousername,
      name: this.nuevoname,
      password: this.nuevopassword,
      estado: this.nuevoestado,
    };
  
    console.log('Datos que se enviarán:', usuarioModificado);
  
    this.authService.modificarSupervisor(this.data.name, this.nuevousername, this.nuevoname, this.nuevopassword, this.nuevoestado).subscribe(
      (response) => {
        console.log('supervisor modificado:', response);
        this.dialogRef.close(usuarioModificado); // Close the dialog and pass the modified data
      },
      (error) => {
        console.error('Error al modificar el supervisor:', error);
        this.errorMessage = 'Error al actualizar el supervisor'; // Mensaje de error
        setTimeout(() => {
          this.errorMessage = ''; 
        }, 2000); 
      }
    );
  }
}