import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from 'src/app/services/sidebar.service';
@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {
// Controla si el sidebar está abierto o cerrado
isSidebarOpen: boolean = false;

isHomeOpen: boolean = false;  // Estado del submenú de Home
  menuItems = [
    { titulo: 'Empleados', url: 'feature/empleados' },  // Ruta completa, incluye el prefijo 'feature'
    { titulo: 'Empresas', url: 'feature/empresas' }     // Ruta completa, incluye el prefijo 'feature'
  ];

  constructor(private sidebarService: SidebarService, private router: Router) {}

  
  toggleHomeSubMenu() {
    this.isHomeOpen = !this.isHomeOpen;
  }

  // Función para alternar el estado del sidebar
  toggleSidebar() {
     this.isSidebarOpen = !this.isSidebarOpen;
  } 

  // Método para manejar el clic y navegar
  navigateTo(route: string) {
    this.sidebarService.navigateTo(route);
  }

  navigateToHome() {
    this.router.navigate(['/feature/home']);  // Navegar a HomeComponent
  }
  navigateTo1(url: string) {
    this.router.navigate([url]);  // Navega a la URL especificada
  }
  
  }
  

