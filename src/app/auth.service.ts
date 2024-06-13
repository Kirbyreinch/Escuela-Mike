import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import {  HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { saveAs } from 'file-saver';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl='http://127.0.0.1:8000';
  private usuariosSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
  }



  private logoSource = new Subject<string>();
  private usernameSource = new Subject<string>();

  logo$ = this.logoSource.asObservable();
  username$ = this.usernameSource.asObservable();


  updateLogo(logo: string) {
    this.logoSource.next(logo);
  }

  updateUsername(username: string) {
    this.usernameSource.next(username);
  }







  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('user', username)
      .set('password', password);
    const url = `${this.apiurl}/login`;
    console.log(`Sending request to URL: ${url}?${params.toString()}`);
    return this.http.post(url, null, { params }).pipe(
      map((response: any) => {
        // Si la respuesta es un array, asumimos que contiene los datos del usuario
        if (Array.isArray(response) && response.length > 0) {
          const userData = response[0];
          const user = {
            id: userData.id,
            rol: userData.rol,
            escuela: userData.escuela || null // Manejar el caso en el que 'escuela' podría no estar presente
          };
          return user;
        } else {
          throw new Error('Invalid response format');
        }
      })
    );
  }


 /////////OBTENER///////////////////////////////////////////////////////////////////////////////////////////////////
  // URL para obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    const url = `${this.apiurl}/users/info/consulta/`; 
    return this.http.get<any[]>(url);
  }


  getDirectoresPorEscuela(escuela: string): Observable<any[]> {
    const url = `${this.apiurl}/users/info/consulta/escuela/${escuela}?activate=true`;
    return this.http.get<any[]>(url);
  }



  getusuariosPorEscuela(): Observable<any[]> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/users/info/consulta/escuela/${escuela}?activate=true`;
    return this.http.get<any[]>(url);
  }

  //ESSCUELAS//



  getEscuelas_supervisor(): Observable<any[]> {
    const url = `${this.apiurl}/escuela/consulta/`; 
    return this.http.get<any[]>(url);
  }








  getEscuelaPorNombre(nombre: string): Observable<any> {
    const url = `${this.apiurl}/escuela/consulta/{escuela}?school=${nombre}`;
    return this.http.get<any>(url);
  }



  getEscuelas(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/escuela/consulta/{escuela}?school=${escuela}`;
    return this.http.get<any>(url);
  }
  


  getEscuelaByNombre(escuela: string): Observable<any> {
    const url = `${this.apiurl}/escuela/consulta/{escuela}?school=${escuela}`;
    console.log('URL de la API:', url); // Verifica la URL
    return this.http.get<any>(url);
  }

  getexpenses(): Observable<any[]> {
    const url = `${this.apiurl}/categoria/consulta/all/egresos`; 
    return this.http.get<any[]>(url);
  }

  getCategoriaingreso(): Observable<any[]> {
    const escuela = localStorage.getItem('escuela');
    const url = `${this.apiurl}/categoria/consulta/escuela/ingresos?nombre_escuela=${escuela}`; 
    return this.http.get<any[]>(url);
  }

  getCategoriaegreso(): Observable<any[]> {
    const escuela = localStorage.getItem('escuela');
    const url = `${this.apiurl}/categoria/consulta/escuela/egresos?nombre_escuela=${escuela}`; 
    return this.http.get<any[]>(url);
  }




  //------ DASHBOARD
  dashboardingreso(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/incomes?school=${escuela}`;
    return this.http.get<any>(url);
  }


  dashboardingreso_otros(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/other_incomes?school=${escuela}`;
    return this.http.get<any>(url);
  }



  dashboardegreso(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get_all/expenses?school=${escuela}`;
    return this.http.get<any>(url);
  }


  dashboardegreso_otros(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get_all/other_expenses?school=${escuela}`;
    return this.http.get<any>(url);
  }






  //MES ACTUAL
  dashboaringresos_mes(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/incomes/current_month?school=${escuela}`;
    return this.http.get<any>(url);
  }



  dashboaringresos_otros_mes(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/other_incomes/current_month?school=${escuela}`;
    return this.http.get<any>(url);
  }





  dashboaregresos_mes(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/expenses/current_month?school=${escuela}`;
    return this.http.get<any>(url);
  }




  //MES ESPECIFICO
  dashboardingreso_pormes(mes: number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/incomes/entered_month?school=${escuela}&month=${mes}`;
    return this.http.get<any>(url);
  }
  

  dashboardingreso_otrospormes(mes: number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/other_incomes/entered_month?school=${escuela}&month=${mes}`;
    return this.http.get<any>(url);
  }



  dashboardegreso_pormes(mes: number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/expenses/entered_month?school=${escuela}&month=${mes}`;
    return this.http.get<any>(url);
  }



  //AÑO ESPECIFICO


  Ingresos_Año(start: number, end:number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/incomes/year_range?school=${escuela}&start_year=${start}&end_year=${end}`;
    return this.http.get<any>(url);
  }


  OtrosIngresos_Año(start: number, end:number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/other_incomes/year_range?school=${escuela}&start_year=${start}&end_year=${end}`;
    return this.http.get<any>(url);
  }


  Egresos_Año(start: number, end:number): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/expenses/year_range?school=${escuela}&start_year=${start}&end_year=${end}`;
    return this.http.get<any>(url);
  }




  Ingresos_TodosAños(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl} /dashboard/get/incomes/for_year?school=${escuela}`;
    return this.http.get<any>(url);
  }
 

  Egresos_TodosAños(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/dashboard/get/expenses/for_year?school=${escuela}`;
    return this.http.get<any>(url);
  }




  getingreso(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/income/consulta/escuela/{escuela}?school=${escuela}`;
    return this.http.get<any>(url);
  }

  

  getegreso(): Observable<any> {
    const escuela_nombre = localStorage.getItem('escuela');
    if (!escuela_nombre) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/expenses/consultar/escuela/${escuela_nombre}`;
    return this.http.get<any>(url);
  }


  getfile(name_file: string): Observable<Blob> {
    const url = `${this.apiurl}/file/${name_file}`;
    console.log('Requesting image from URL:', url); // Console log for the request URL
    return this.http.get(url, { responseType: 'blob' });
  }



  getexpensefiles(id_expenses: string): Observable<any> {
    const url = `${this.apiurl}/expensesFile/consultar/${id_expenses}`;
    return this.http.get<any>(url);
  }




  
  uploadFile(id_expense: number, file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    const url = `${this.apiurl}/expenses/saveFiles?id_expense=${id_expense}`;
    return this.http.post<any>(url, formData);
  }

  getarchivo(id_expense: string): Observable<any> {
    const url = `${this.apiurl}/expensesFile/consultar/${id_expense}`;
    return this.http.get<any>(url);
  }


  getlogofile(name_logo: string): Observable<any> {
    const url = `${this.apiurl}/logo/${name_logo}`;
    return this.http.get(url, { responseType: 'blob' });
  }



  /////////Crear///////////////////////////////////////////////////////////////////////////////////////////////////
  crearUsuario(usuario: any, rol: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('rol', rol)
      .set('password', password);

    const requestUrl = `${this.apiurl}/users/create`;

    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', usuario);
    console.log('Parámetros rol y password:', { rol, password });

    return this.http.post(requestUrl, usuario, { params });
  }




  crearEscuela(usuario: any, nombre: string): Observable<any> {
    const params = new HttpParams()
      .set('nombre', nombre)
    const requestUrl = `${this.apiurl}/escuela/create`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', usuario);
    console.log('Parámetros nombre:', { nombre });
    return this.http.post(requestUrl, usuario, { params });
  }



  crearlogo(nombreEscuela: string, logo: FormData): Observable<any> {
    const params = new HttpParams().set('nombre_escuela', nombreEscuela);
    const requestUrl = `${this.apiurl}/escuela/saveLogo`;
    console.log('Dirección de la solicitud:', requestUrl);
    return this.http.post(requestUrl, logo, { params });
  }

 



  crearCategoria(categoria: any): Observable<any> {
    const requestUrl = `${this.apiurl}/categoria/crear`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', categoria);
    return this.http.post(requestUrl, categoria);
  }

  crearCategoriaegr(categoriasegr: any): Observable<any> {
    const requestUrl = `${this.apiurl}/categoria/crear`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', categoriasegr);
    return this.http.post(requestUrl, categoriasegr);
  }


  crearingreso(ing: any): Observable<any> {
    const requestUrl = `${this.apiurl}/income/create`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', ing);
    return this.http.post(requestUrl, ing);
  }

  crearegreso(egr: any): Observable<any> {
    const requestUrl = `${this.apiurl}/expenses/create`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', egr);
    return this.http.post(requestUrl, egr);
  }




  ArchivoEgreso(id_expense: string, file: string): Observable<any> {
    const params = new HttpParams()
      .set('id_expense', id_expense)
      .set('file', file);
    const url = `${this.apiurl}/expenses/saveFiles`;
    console.log(`Sending request to URL: ${url}?${params.toString()}`);
    return this.http.post(url, null, { params });
  }








  crearPDF(doc: any): Observable<any> {
    const requestUrl = `${this.apiurl}/pdf/create/`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', doc);

    return this.http.post(requestUrl, doc, {
      responseType: 'text', // Cambiamos el tipo de respuesta a 'text' ya que estamos esperando un texto
      headers: new HttpHeaders().append('Content-Type', 'application/json') // Asegúrate de que el servidor acepte JSON
    }).pipe(
      map(response => this.handleFileDownloadResponse(response)) // Manejar la respuesta para descargar el archivo
    );
  }

  private handleFileDownloadResponse(response: any): void {
    const blob = new Blob([response], { type: 'application/pdf' }); // Crear un Blob con el texto recibido
    saveAs(blob, 'nombre_archivo.pdf'); // Iniciar la descarga del archivo
  }



  /////////Eliminar///////////////////////////////////////////////////////////////////////////////////////////////////
////eliminar usuarios
eliminarUsuario(user_id: string): Observable<any> {
  const params = new HttpParams().set('user_id', user_id);
  const url = `${this.apiurl}/users/delete`;
  console.log('Request URL para eliminar usuario:', `${url}?${params.toString()}`);
  return this.http.delete(url, { params });
}


eliminarescuela(school: string): Observable<any> {
  const params = new HttpParams().set('school', school);
  const url = `${this.apiurl}/escuela/delete`;
  console.log('Request URL para eliminar escuela:', `${url}?${params.toString()}`);
  return this.http.delete(url, { params });
}






















/////////Modificar///////////////////////////////////////////////////////////////////////////////////////////////////
modificarUsuario(id: string, nuevoname: string, nuevolast_name: string, nuevoEmail: string, nuevotel: string, nuevoescuela: string): Observable<any> {
  const url = `${this.apiurl}/users/update/user_info`;
  const body = {
    id: id,
    name: nuevoname,
    last_name: nuevolast_name,
    email: nuevoEmail,
    tel: nuevotel,
    escuela: nuevoescuela
  };
  return this.http.put(url, body);
}


modificaralumnado(escuela_nombre: string, nuevo_NoFamilia: string, nuevo_Cuota: string, nuevo_TTAlumnos: string, nuevo_TTGrupos: string, nuevo_Turno: string): Observable<any> {
  const url = `${this.apiurl}/escuela/actualizar/alumnado`;
  const body = {
    escuela_nombre: escuela_nombre,
    NoFamilia: nuevo_NoFamilia,
    Cuota: nuevo_Cuota,
    TTAlumnos: nuevo_TTAlumnos,
    TTGrupos: nuevo_TTGrupos,
    Turno: nuevo_Turno
  };
  return this.http.put(url, body);
}



modificarLocalizacion(escuela_nombre: string, nuevo_clave: string, nuevo_domicilio: string, nuevo_localidad: string, nuevo_zona: string, nuevo_sector: string, nuevo_telefono: string): Observable<any> {
  const url = `${this.apiurl}/escuela/actualizar/localizacion`;
  const body = {
    escuela_nombre: escuela_nombre,
    clave: nuevo_clave,
    domicilio: nuevo_domicilio,
    localidad: nuevo_localidad,
    zona: nuevo_zona,
    sector: nuevo_sector,
    telefono: nuevo_telefono
  };
  return this.http.put(url, body);
}



  modificarUsuariorol(username: string, nuevorol: string): Observable<any> {
    const url = `${this.apiurl}/users/update/user`;
    const body = { username: username, rol: nuevorol };
    return this.http.put(url, body);
  }


// Método para emitir un evento después de modificar un usuario
usuarioModificado(): void {
  // Emitir un evento para notificar que se ha modificado un usuario
  this.usuariosSubject.next([]);
}




modificarEscuela(school: string, nuevoname: string): Observable<any> {
  const url = `${this.apiurl}/escuela/actualizar/nombre`;
  const body = {
    school: school,
    newname: nuevoname,
  };
  return this.http.put(url, body);
}






modificarCategoria(nombreActual: string, tipoActual: string, id: number, nuevoNombre: string, nuevoIdentificador: string, escuelaNombre:string): Observable<any> {
  const url = `${this.apiurl}/categoria/actualizar?categoria_nombre=${nombreActual}&categoria_tipo=${tipoActual}`;
  const body = {
    id: id,
    nombre: nuevoNombre,
    identificador: nuevoIdentificador,
    escuela_nombre:escuelaNombre
  };
  
  // Log para depuración
  console.log('Enviando solicitud PUT a:', url);
  console.log('Cuerpo de la solicitud:', body);

  return this.http.put(url, body);
}





validarArchivo(id: string, user_register: string): Observable<any> {
  const url = `${this.apiurl}/expenses/validated?id_expense_file=${id}&user_register=${user_register}`;
  console.log('URL para validar:', url); 
  return this.http.put<any>(url, {});
}





}
