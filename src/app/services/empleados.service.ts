import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  private empleados = [
    {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@example.com',
      puesto: 'Gerente',
      telefono: '123456789',
      empres: 'Empresa A',
      fechaIngreso: '2024-01-01',
      
    },
    {
      id: 2,
      nombre: 'Ana López',
      email: 'ana@example.com',
      puesto: 'Analista',
      telefono: '987654321',
      empres: 'Empresa B',
      fechaIngreso: '2022-03-15',
      

    },
    {
      id: 3,
      nombre: 'Ariel Ortega',
      email: 'ariel@example.com',
      puesto: 'Soporte',
      telefono: '098347283',
      empres: 'Empresa C',
      fechaIngreso: '2019-01-01',
      

    },
    {
      id: 4,
      nombre: 'Alejo Torres',
      email: 'alejo@example.com',
      puesto: 'Proyectos',
      telefono: '987654321',
      empres: 'Empresa D',
      fechaIngreso: '2023-03-18',
    },
    {
      id: 5,
      nombre: 'Manuela Perez',
      email: 'manuela@example.com',
      puesto: 'Soporte',
      telefono: '09834756392',
      empres: 'Empresa E',
      fechaIngreso: '2019-01-01',
      

    },
    {
      id: 6,
      nombre: 'Tamara Alvarez',
      email: 'tamara@example.com',
      puesto: 'Proyectos',
      telefono: '0947382947',
      empres: 'Empresa F',
      fechaIngreso: '2023-03-18',
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
  updateEmpleado(id: number, updatedEmpleado: any) {
    const index = this.empleados.findIndex((emp) => emp.id === id);
    if (index !== -1) {
      this.empleados[index] = { ...this.empleados[index], ...updatedEmpleado };
    }
  }

  deleteEmpleado(id: number) {
    this.empleados = this.empleados.filter(e => e.id !== id);
  }


}