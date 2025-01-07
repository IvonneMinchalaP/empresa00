import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}
  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioID');
    sessionStorage.removeItem('Nombre'); 
    console.log('Sesión cerrada exitosamente');
        // Redirige al login

    this.router.navigate(['']);
  }

  Perfil() {
  
    // Redirige al perfil del usuario
    this.router.navigate(['feature/usuario']);
  }

  }



