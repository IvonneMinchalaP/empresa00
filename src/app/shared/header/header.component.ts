import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  menuVisible = false; // Inicialmente el menú está oculto

  constructor(private router: Router) { }

  // Método para alternar la visibilidad del menú
  toggleMenu() {
    this.menuVisible = !this.menuVisible;
  }

  // Método para redirigir al login
 // logout() {
    // Redirige a la página de login
   // this.router.navigate(['/login']);
  //}
}
