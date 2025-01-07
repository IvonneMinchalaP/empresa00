import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private apiUrlContacto = 'https://localhost:7085/api/contacto/insertar'; 

  constructor(private http: HttpClient) {}

  insertarContacto(contacto: any) : Observable<any>{
    const token = sessionStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`

    });
    return this.http.post(this.apiUrlContacto, JSON.stringify(contacto), { headers });

    //return this.http.post(this.apiUrlContacto, contacto, { headers });
  }
}
