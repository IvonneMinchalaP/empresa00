import { Component } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  menuVisible: boolean = false;
  sidebarVisible: boolean = false;
  year: number = new Date().getFullYear();

  menuItems = [
    { text: 'Inicio', icon: 'home' },
    { text: 'Empresas', icon: 'business' },
    { text: 'Empleados', icon: 'group' }
  ];

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  toggleSidebar() {
    this.sidebarVisible = !this.sidebarVisible;
  }

  onSelectionChanged(event: any) {
    console.log('Item seleccionado:', event.itemData.text);
  }
}
