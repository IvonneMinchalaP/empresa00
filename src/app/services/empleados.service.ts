import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleados = [
    {
      EmpleadoID: 1,
      Nombre: 'Juan Pérez',
      Email: 'juan@example.com',
      Puesto: 'Gerente',
      Telefono: '123456789',
      FechaIngreso: '2024-01-01',
      
    },
    {
      EmpleadoID: 2,
      Nombre: 'Ana López',
      Email: 'ana@example.com',
      Puesto: 'Analista',
      Telefono: '987654321',
      FechaIngreso: '2022-03-15',
      

    },
    {
      EmpleadoID: 3,
      Nombre: 'Ariel Ortega',
      Email: 'ariel@example.com',
      Puesto: 'Soporte',
      Telefono: '098347283',
      FechaIngreso: '2019-01-01',
      

    },
    {
      EmpleadoID: 4,
      Nombre: 'Alejo Torres',
      Email: 'alejo@example.com',
      Puesto: 'Proyectos',
      Telefono: '987654321',
      FechaIngreso: '2023-03-18',
    },
    {
      EmpleadoID: 5,
      Nombre: 'Manuela Perez',
      Email: 'manuela@example.com',
      Puesto: 'Soporte',
      Telefono: '09834756392',
      FechaIngreso: '2019-01-01',
      

    },
    {
      EmpleadoID: 6,
      Nombre: 'Tamara Alvarez',
      Email: 'tamara@example.com',
      Puesto: 'Proyectos',
      Telefono: '0947382947',
      FechaIngreso: '2023-03-18',
    },
  ];

  constructor() {}

  getEmpleados() {
    return this.empleados;
  }

  addEmpleado(empleado: any) {
    this.empleados.push(empleado);
  }

  // updateEmpleado(id: number, updatedData: any) {
  //   const empleado = this.empleados.find(e => e.id === id);
  //   if (empleado) Object.assign(empleado, updatedData);
  // }
// Actualizar un empleado existente
  updateEmpleado(EmpleadoID: number, updatedEmpleado: any) {
    const index = this.empleados.findIndex((emp) => emp.EmpleadoID === EmpleadoID);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleados[index], ...updatedEmpleado };
    }
  }

  deleteEmpleado(EmpleadoID: number) {
    this.empleados = this.empleados.filter(e => e.EmpleadoID !== EmpleadoID);
  }


}