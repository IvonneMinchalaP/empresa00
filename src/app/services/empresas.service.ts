import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {
  private apiUrlcargar = 'https://localhost:7085/api/empresa/cargar'; 
  private apiUrlObtenerTodas = 'https://localhost:7085/api/empresa/obtener-empresas'; 

  constructor(private http: HttpClient) {}

  obtenerEmpresas() {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerTodas, { headers });
  }
  
    cargarEmpresa( empresaID: number, token: string,): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
  
      // El usuarioID se envía como un parámetro en la URL
    const url = `${this.apiUrlcargar}?empresaID=${empresaID}`;
    return this.http.get(url, { headers });
    }
  addEmpresa(empresa: any) {
    //this.empresas.push(empresa);
  }

  updateEmpresa(EmpresaID: number, updateEmpresa: any) {
    // const index = this.empresas.findIndex((empr) => empr.EmpresaID === EmpresaID);
    // if (index !== -1) {
    //   this.empresas[index] = { ...this.empresas[index], ...updateEmpresa };
    // }
  }

  deleteEmpresa(EmpresaID: number) {
    //this.empresas = this.empresas.filter(e => e.EmpresaID !== EmpresaID);
  }
}

