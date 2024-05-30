import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiurl='http://127.0.0.1:8000';
  private usuariosSubject = new BehaviorSubject<any[]>([]);
  constructor(private http: HttpClient) {
  }


  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('user', username)
      .set('password', password);

    const url = `${this.apiurl}/login`;

    // Console log para mostrar la URL y los parámetros
    console.log(`Sending request to URL: ${url}?${params.toString()}`);

    return this.http.post(url, null, { params });
  }


 /////////OBTENER///////////////////////////////////////////////////////////////////////////////////////////////////
  // URL para obtener todos los usuarios
  getUsuarios(): Observable<any[]> {
    const url = `${this.apiurl}/users/info/consulta/`; 
    return this.http.get<any[]>(url);
  }



  getEscuelas(): Observable<any> {
    const escuela = localStorage.getItem('escuela');
    if (!escuela) {
      throw new Error('No hay ninguna escuela en el localStorage');
    }
    const url = `${this.apiurl}/escuela/consulta/{escuela}?school=${escuela}`;
    return this.http.get<any>(url);
  }
  



  getCategoriaingreso(): Observable<any[]> {
    const url = `${this.apiurl}/categoria/consulta/ingresos`; 
    return this.http.get<any[]>(url);
  }

  getCategoriaegreso(): Observable<any[]> {
    const url = `${this.apiurl}/categoria/consulta/egresos`; 
    return this.http.get<any[]>(url);
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
    const url = `${this.apiurl}/expenses/consultar/escuela/{escuela}?school=${escuela_nombre}`;
    return this.http.get<any>(url);
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




  crearEscuela(usuario: any, nombre: string, logo:string): Observable<any> {
    const params = new HttpParams()
      .set('nombre', nombre)
      .set('logo', logo)
    const requestUrl = `${this.apiurl}/escuela/create`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', usuario);
    console.log('Parámetros nombre:', { nombre });
    return this.http.post(requestUrl, usuario, { params });
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

  crearegreso(categoriasegr: any): Observable<any> {
    const requestUrl = `${this.apiurl}/categoria/crear`;
    console.log('Dirección de la solicitud:', requestUrl);
    console.log('Datos enviados:', categoriasegr);
    return this.http.post(requestUrl, categoriasegr);
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





modificarCategoria(nombreActual: string, tipoActual: string, id: number, nuevoNombre: string, nuevoIdentificador: string): Observable<any> {
  const url = `${this.apiurl}/categoria/actualizar?categoria_nombre=${nombreActual}&categoria_tipo=${tipoActual}`;
  const body = {
    id: id,
    nombre: nuevoNombre,
    identificador: nuevoIdentificador
  };
  
  // Log para depuración
  console.log('Enviando solicitud PUT a:', url);
  console.log('Cuerpo de la solicitud:', body);

  return this.http.put(url, body);
}


}
