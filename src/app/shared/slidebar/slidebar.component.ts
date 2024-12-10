import { Component,OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';
@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {


  menuItems = [
    { titulo: 'Home', url: '/' },
    { titulo: 'Empleados', url: '/empleados' },
    { titulo: 'Empresas', url: '/empresa' },
  ];

  // Controla si el sidebar está abierto o cerrado
  isSidebarOpen: boolean = false;

  // Función para alternar el estado del sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  }
  

