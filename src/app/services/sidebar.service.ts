import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any[] = [
    { titulo: 'Home', url: '/' },
    { titulo: 'Empleados', url: '/empleados' },
    { titulo: 'Empresas', url: '/empresas' }
  ];

  constructor() { }
}