import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private apiUrlObtenerEmpleado= 'https://localhost:7085/api/empleado/obtener-empleado'; 

  constructor(private http: HttpClient) {}

  obtenerEmpleado() {
    const token = localStorage.getItem('token'); 

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(this.apiUrlObtenerEmpleado, { headers });
  }

  
  getEmpleados() {
    //return this.empleados;
  }

  addEmpleado(empleado: any) {
    //this.empleados.push(empleado);
  }

  // updateEmpleado(id: number, updatedData: any) {
  //   const empleado = this.empleados.find(e => e.id === id);
  //   if (empleado) Object.assign(empleado, updatedData);
  // }
// Actualizar un empleado existente
  updateEmpleado(EmpleadoID: number, updatedEmpleado: any) {
    // const index = this.empleados.findIndex((emp) => emp.EmpleadoID === EmpleadoID);
    // if (index !== -1) {
    //   this.empleados[index] = { ...this.empleados[index], ...updatedEmpleado };
    }
  }

  // deleteEmpleado(EmpleadoID: number) {
  //  //this.empleados = this.empleados.filter(e => e.EmpleadoID !== EmpleadoID);
  // }


