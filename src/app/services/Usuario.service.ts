import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrlRegistrar = 'https://localhost:7085/api/usuario/registrar'; 
  private apiUrlIniciarSesion = 'https://localhost:7085/api/usuario/iniciar-sesion';
  private apiUrlConsultar = 'https://localhost:7085/api/usuario/consultar'; 
  private apiUrlActualizar = 'https://localhost:7085/api/usuario/actualizar';

  constructor(private http: HttpClient) {}


   // Método para iniciar sesión
   iniciarSesion(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlIniciarSesion, JSON.stringify(usuario), { headers });
  }

  // Método para registrar un usuario
  registrarUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrlRegistrar, JSON.stringify(usuario), { headers });
  }

  consultarUsuario(token: string, usuarioID: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // El usuarioID se envía como un parámetro en la URL
  const url = `${this.apiUrlConsultar}?usuarioID=${usuarioID}`;
  return this.http.get(url, { headers });
  }

  // Método para actualizar usuario
  actualizarUsuario(token: string, usuario: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.put(this.apiUrlActualizar, JSON.stringify(usuario), { headers });
  }

}