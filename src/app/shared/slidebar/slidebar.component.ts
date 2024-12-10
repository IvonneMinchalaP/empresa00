import { Component } from '@angular/core';

@Component({
  selector: 'app-slidebar',
  templateUrl: './slidebar.component.html',
  styleUrls: ['./slidebar.component.css']
})
export class SlidebarComponent {
 
    selectedIndex: number = 0; // Índice de la opción seleccionada
    sidebarVisible: boolean = false; // Controla la visibilidad del sidebar
  
    menuItems = [
      { text: 'Inicio', icon: 'home' },
      { text: 'Empresas', icon: 'business' },
      { text: 'Empleados', icon: 'group' },
    ];
  
    // Método para manejar la selección de un ítem en el menú
    onSelectionChanged(event: any): void {
      this.selectedIndex = event.itemIndex; // Extrae el índice de la selección
    }
  
    // Alterna la visibilidad del sidebar
    toggleSidebar(): void {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
  

