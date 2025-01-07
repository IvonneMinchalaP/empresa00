import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrlObtenerEmpleado= 'https://localhost:7085/api/empleado/obtener-empleado'; 
  private apiUrlcargarEmpleado = 'https://localhost:7085/api/empleado/cargar'; 
  private apiUrlAgregarEmpleado = 'https://localhost:7085/api/empleado/agregar';
  private apiUrlActualizarEmpleado = 'https://localhost:7085/api/empleado/actualizar'; 
  private apiUrlEliminarEmpleado = 'https://localhost:7085/api/empleado/eliminar'; 

  constructor(private http: HttpClient) {}

  obtenerEmpleado() {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerEmpleado, { headers });
  }

  agregarEmpleado(empleado: any) : Observable<any>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrlAgregarEmpleado, empleado, { headers });
  }


  cargarEmpleado( empleadoID: number): Observable<any> {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // El usuarioID se envía como un parámetro en la URL
  const url = `${this.apiUrlcargarEmpleado}?empleadoID=${empleadoID}`;
  return this.http.get(url, { headers });
  }

  actualizarEmpleado(empleado: any) : Observable<any>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.apiUrlActualizarEmpleado, empleado, { headers });
    
  }

  eliminarEmpleado(empleadoID: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrlEliminarEmpleado}?empleadoID=${empleadoID}`;
    return this.http.delete(url, { headers });
    }
}

