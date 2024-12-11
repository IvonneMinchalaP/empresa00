import { Component,OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {



  menuItems = [
    { titulo: 'Empleados', url: 'empleados' },  // Ruta completa, incluye el prefijo 'feature'
    { titulo: 'Empresas', url: 'empresas' }     // Ruta completa, incluye el prefijo 'feature'
  ];

  constructor(private sidebarService: SidebarService) {}

  // Controla si el sidebar está abierto o cerrado
    isSidebarOpen: boolean = false;


  // Método para manejar el clic y navegar
  navigateTo(route: string) {
    this.sidebarService.navigateTo(route);
  }

  // Función para alternar el estado del sidebar
  toggleSidebar() {
     this.isSidebarOpen = !this.isSidebarOpen;
  }
  }
  

