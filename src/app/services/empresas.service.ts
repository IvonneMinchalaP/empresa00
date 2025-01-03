import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrlObtenerTodas = 'https://localhost:7085/api/empresa/obtener-empresas';
  private apiUrlcargar = 'https://localhost:7085/api/empresa/cargar'; 
  private apiUrlAgregar = 'https://localhost:7085/api/empresa/agregar';
  private apiUrlActualizar = 'https://localhost:7085/api/empresa/actualizar'; 

  constructor(private http: HttpClient) {}

  obtenerEmpresas() {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerTodas, { headers });
  }
  
  agregarEmpresa(empresa: any) : Observable<any>{
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrlAgregar, empresa, { headers });
  }


  cargarEmpresa( empresaID: number): Observable<any> {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    // El usuarioID se envía como un parámetro en la URL
  const url = `${this.apiUrlcargar}?empresaID=${empresaID}`;
  return this.http.get(url, { headers });
  }

  actualizarEmpresa(empresa: any) : Observable<any>{
    const token = localStorage.getItem('token'); 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.apiUrlActualizar, empresa, { headers });
    
  }

  deleteEmpresa(EmpresaID: number) {
    //this.empresas = this.empresas.filter(e => e.EmpresaID !== EmpresaID);
  }
}

