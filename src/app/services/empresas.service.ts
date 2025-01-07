import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrlObtenerEmpresa = 'https://localhost:7085/api/empresa/obtener-empresas';
  private apiUrlcargar = 'https://localhost:7085/api/empresa/cargar'; 
  private apiUrlAgregar = 'https://localhost:7085/api/empresa/agregar';
  private apiUrlActualizar = 'https://localhost:7085/api/empresa/actualizar'; 
  private apiUrlEliminar = 'https://localhost:7085/api/empresa/eliminar'; 

  constructor(private http: HttpClient) {}

  obtenerEmpresas() {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerEmpresa,{ headers });
  }
  
  agregarEmpresa(empresa: any) : Observable<any>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrlAgregar, empresa, { headers });
  }


  cargarEmpresa( empresaID: number): Observable<any> {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // El usuarioID se envía como un parámetro en la URL
  const url = `${this.apiUrlcargar}?empresaID=${empresaID}`;
  return this.http.get(url, { headers });
  }

  actualizarEmpresa(empresa: any) : Observable<any>{
    const token = sessionStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.apiUrlActualizar, empresa, { headers });
    
  }

  eliminarEmpresa(empresaID: number): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    const url = `${this.apiUrlEliminar}?empresaID=${empresaID}`;
    return this.http.delete(url, { headers });
    }
}

