import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { ModificarCategoriaComponent } from '../modificar-categoria/modificar-categoria.component';


@Component({
  selector: 'app-iye',
  templateUrl: './iye.component.html',
  styleUrl: './iye.component.css'
})
export class IyeComponent implements OnInit {
  egresos: any[] = [];
  egresosOriginal: any[] = [];

  ingresos: any[] = [];
  ingresosOriginal: any[] = [];

  filtroIngresos: string = '';
  filtroSeleccionadoIngresos: string = 'id';

  filtroEgresos: string = '';
  filtroSeleccionadoEgresos: string = 'id';


  fechaInicioEgresos: string = '';
  fechaFinEgresos: string = '';


  archivoLink: string = '';
  userRole: string = '';
  

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadegresos();
    this.userRole = localStorage.getItem('rol') || '';
  }



  loadegresos() {
    this.authService.getegreso().subscribe(
      (egresos) => {
        this.egresos = egresos;
        this.egresos.forEach(egreso => {
          this.authService.getarchivo(egreso.id).subscribe(
            (archivo) => {
              egreso.archivoLink = archivo.archivo; // Asegúrate de que este campo contiene la URL correcta del PDF
              egreso.estado = archivo.validado;
  
              // Determinar el campo de rol en función del rol del usuario
              if (this.userRole === "tesorero") {
                egreso.rol = archivo.tesorero;
              } else if (this.userRole === "presidente") {
                egreso.rol = archivo.presidente;
              } else if (this.userRole === "director") {
                egreso.rol = archivo.director;
              } else if (this.userRole === "validado") {
                egreso.rol = archivo.director;
              } else {
                console.error("Rol de usuario no reconocido");
                return;
              }
            },
            (error) => {
              console.error('Error al obtener el archivo', error);
            }
          );
        });
        this.egresosOriginal = [...egresos];
      },
      (error) => {
        console.error('Error al obtener la lista de egresos', error);
      }
    );
  }

  aplicarFiltroIngresos() {
    const filtroMinusculas = this.filtroIngresos.toLowerCase();
    this.ingresos = this.ingresosOriginal.filter(ingreso => {
      switch (this.filtroSeleccionadoIngresos) {
        case 'id':
          return ingreso.id.toString().toLowerCase().startsWith(filtroMinusculas);
        case 'nombre':
          return ingreso.escuela.toLowerCase().startsWith(filtroMinusculas);
        case 'categoria':
          return ingreso.categoria.toLowerCase().startsWith(filtroMinusculas);
        default:
          return true;
      }
    });
  }

  aplicarFiltroEgresos() {
    const filtroMinusculas = this.filtroEgresos.toLowerCase();
    const fechaInicio = this.fechaInicioEgresos ? new Date(this.fechaInicioEgresos) : null;
    const fechaFin = this.fechaFinEgresos ? new Date(this.fechaFinEgresos) : null;

    this.egresos = this.egresosOriginal.filter(egreso => {
      let matchesTextFilter = false;

      if (this.filtroSeleccionadoEgresos === 'id') {
        matchesTextFilter = egreso.id.toString().toLowerCase().startsWith(filtroMinusculas);
      } else if (this.filtroSeleccionadoEgresos === 'nombre') {
        matchesTextFilter = egreso.nombre.toLowerCase().startsWith(filtroMinusculas);
      } else if (this.filtroSeleccionadoEgresos === 'category') {
        matchesTextFilter = egreso.category.toString().toLowerCase().startsWith(filtroMinusculas);
      }

      const matchesDateFilter = (!fechaInicio || new Date(egreso.fecha) >= fechaInicio) &&
                                (!fechaFin || new Date(egreso.fecha) <= fechaFin);
      
      return matchesTextFilter && matchesDateFilter;
    });
}

  openConfirmationDialog(user_id: string) {
    console.log('user_id seleccionado:', user_id);
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      width: '400px',
      data: { user_id }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eliminarUsuario(user_id);
      }
    });
  }

  eliminarUsuario(user_id: string) {
    this.authService.eliminarUsuario(user_id).subscribe(
      () => {
        console.log('Usuario eliminado exitosamente');
        this.ingresos = this.ingresos.filter(ingreso => ingreso.id !== user_id);
      },
      (error) => {
        console.error('Error al eliminar el usuario', error);
      }
    );
  }

  openModificarCategoria(categoria: any) {
    const dialogRef = this.dialog.open(ModificarCategoriaComponent, {
      width: '400px',
      data: {
        nombre: categoria.nombre,
        identificador: categoria.identificador
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadegresos();
      }
    });
  }




  openArchivos(archivoLink: string) {
    this.authService.getfile(archivoLink).subscribe(
      (data: Blob) => {
        // Crear una URL para la imagen
        const imageUrl = URL.createObjectURL(data);
        // Abrir la imagen en una nueva ventana del navegador
        window.open(imageUrl);
      },
      (error) => {
        console.error('Error al obtener la imagen:', error);
      }
    );
  }

  openArchivo(id_expense: string) {
    this.authService.getexpensefiles(id_expense).subscribe(
      (response) => {
        console.log('Respuesta de getexpensefiles:', response);
        let userRoleField: string;
  
        // Determinar el campo correspondiente al rol del usuario
        if (this.userRole === 'presidente') {
          userRoleField = 'presidente_usuario';
        } else if (this.userRole === 'tesorero') {
          userRoleField = 'tesorero_usuario';
        } else if (this.userRole === 'director') {
          userRoleField = 'director_usuario';
        } else {
          console.error('Rol de usuario no reconocido');
          return;
        }
  
        // Mostrar el campo correspondiente al rol del usuario
        if (response && response[userRoleField]) {
          console.log('Usuario encontrado:', response[userRoleField]);
          console.log('Respuesta de getexpensefiles:', response);
          // Aquí puedes hacer lo que necesites con el valor del campo
        } else {
          console.error('No se encontró el campo correspondiente al usuario');
          console.log('Respuesta de getexpensefiles:', response);
        }
      },
      (error) => {
        console.error('Error al obtener el archivo:', error);
      }
    );
  }



  validarEgreso(id: string) {
    const user_register = localStorage.getItem('username') || ''; // Obtener el nombre de usuario del localStorage
  
    // Obtener el archivo asociado al egreso seleccionado
    this.authService.getexpensefiles(id).subscribe(
      (archivo) => {
        console.log('Archivo obtenido:', archivo);
        const idExpenses = archivo.id;
  
        // Usar el id_expenses para validar el archivo
        console.log('Enviando solicitud de validación para id_expenses:', idExpenses);
        this.validarArchivo(idExpenses, user_register);
      },
      (error) => {
        console.error('Error al obtener el archivo:', error);
      }
    );
  }
  
  validarArchivo(idExpenses: string, userRegister: string) {
    // Imprimir los datos que se envían en la solicitud HTTP
    console.log('Validando archivo con id_expenses:', idExpenses);
    console.log('Usuario registrado:', userRegister);
  
    // Llamar a la función validarArchivo con el id_expenses y el usuario registrado
    this.authService.validarArchivo(idExpenses, userRegister).subscribe(
      (response) => {
        console.log('Archivo validado correctamente:', response);
        this.loadegresos(); // Actualizar la lista de egresos si es necesario
      },
      (error) => {
        console.error('Error al validar el archivo:', error);
      }
    );
  }




  


}