import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor(private router: Router) { }

  // Método para navegar a las rutas del sidebar
  navigateTo(route: string) {
    this.router.navigate([route]);  // Navega a la ruta pasada como argumento
  }
}