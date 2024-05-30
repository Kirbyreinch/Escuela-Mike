import { Component,OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { ModificarCategoriaComponent } from '../modificar-categoria/modificar-categoria.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categoriasegr: any[] = [];
  categoriasOriginalegr: any[] = [];

  categorias: any[] = [];
  categoriasOriginal: any[] = [];

  filtroIngresos: string = '';
  filtroSeleccionadoIngresos: string = 'id';

  filtroEgresos: string = '';
  filtroSeleccionadoEgresos: string = 'id';

  constructor(private authService: AuthService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCategorias();
    this.loadCategoriasegr();
  }

  loadCategorias() {
    this.authService.getCategoriaingreso().subscribe(
      (categorias) => {
        this.categorias = categorias;
        this.categoriasOriginal = [...categorias];
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }



  loadCategoriasegr() {
    this.authService.getCategoriaegreso().subscribe(
      (categoriasegr) => {
        this.categoriasegr = categoriasegr;
        this.categoriasOriginalegr = [...categoriasegr];
      },
      (error) => {
        console.error('Error al obtener la lista de usuarios', error);
      }
    );
  }



  aplicarFiltroIngresos() {
    const filtroMinusculas = this.filtroIngresos.toLowerCase();
    this.categorias = this.categoriasOriginal.filter(categorias => {
      switch (this.filtroSeleccionadoIngresos) {
        case 'id':
          return categorias.id.toString().toLowerCase().startsWith(filtroMinusculas);
        case 'nombre':
          return categorias.nombre.toString().toLowerCase().startsWith(filtroMinusculas);
        default:
          return true;
      }
    });
  }

  aplicarFiltroEgresos() {
    const filtroMinusculas = this.filtroEgresos.toLowerCase();
    this.categoriasegr = this.categoriasOriginalegr.filter(categoriasegr => {
      switch (this.filtroSeleccionadoEgresos) {
        case 'id':
          return categoriasegr.id.toString().toLowerCase().startsWith(filtroMinusculas);
        case 'nombre':
          return categoriasegr.nombre.toString().toLowerCase().startsWith(filtroMinusculas);
        default:
          return true;
      }
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
        this.categorias = this.categorias.filter(categoria => categoria.id !== user_id);
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
        this.loadCategorias(); // Recargar la lista de categorías después de modificar
        this.loadCategoriasegr();
      }
    });
  }












}