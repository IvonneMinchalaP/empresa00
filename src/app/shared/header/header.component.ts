import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    console.log('Cerrando sesión...');
    // Lógica para cerrar sesión (redireccionar o limpiar credenciales)
  }
}



  // Método para redirigir al login
 // logout() {
    // Redirige a la página de login
   // this.router.navigate(['/login']);
  //}

