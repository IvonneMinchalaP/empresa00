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
      fechaIngreso: '2024-01-01',
    },
    {
      id: 2,
      nombre: 'Ana López',
      email: 'ana@example.com',
      puesto: 'Analista',
      telefono: '987654321',
      fechaIngreso: '2022-03-15',
    },
    {
      id: 3,
      nombre: 'Ariel Ortega',
      email: 'ariel@example.com',
      puesto: 'Soporte',
      telefono: '098347283',
      fechaIngreso: '2019-01-01',
    },
    {
      id: 4,
      nombre: 'Alejo Torres',
      email: 'alejo@example.com',
      puesto: 'Proyectos',
      telefono: '987654321',
      fechaIngreso: '2023-03-18',
    },
  ];


  getEmpleados() {
    return this.empleados;
  }

  addEmpleado(empleado: any) {
    this.empleados.push(empleado);
  }

  updateEmpleado(id: number, updatedData: any) {
    const empleado = this.empleados.find(e => e.id === id);
    if (empleado) Object.assign(empleado, updatedData);
  }

  deleteEmpleado(id: number) {
    this.empleados = this.empleados.filter(e => e.id !== id);
  }
}