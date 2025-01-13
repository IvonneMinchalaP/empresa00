import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeografiaService {
 private apiUrlObtenerGeografica = 'https://localhost:7085/api/geografia/obtener-estructura-geografica'; 

  constructor(private http: HttpClient) {}

  ObtenerEstructuraGeografica() {
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerGeografica,{ headers });
  }
}
