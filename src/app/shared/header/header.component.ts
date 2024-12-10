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
  // // Alterna la visibilidad del submenú
  // toggleUserMenu(): void {
  //   this.userMenuVisible = !this.userMenuVisible;
  // }

  // // Navega al perfil del usuario
  // navigateToProfile(): void {
  //   console.log('Navegando al perfil del usuario...');
    
  // }

  // // Lógica para cerrar sesión
  // logout(): void {
  //   console.log('Cerrando sesión...');
  //    // Redirige a la página de login
  //  // this.router.navigate(['/login']);
  //   // Aquí iría la lógica para cerrar sesión
  // }
}



  // Método para redirigir al login
 // logout() {
    // Redirige a la página de login
   // this.router.navigate(['/login']);
  //}

