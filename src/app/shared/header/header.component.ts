import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/services/theme.service';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMenuOpen = false;
  isDarkMode = false;

  constructor(private router: Router, private themeService: ThemeService) {}

  
  ngOnInit() {
    const savedTheme = sessionStorage.getItem('theme') || 'light'; // Recuperar el tema guardado
    this.isDarkMode = savedTheme === 'dark';
    this.themeService.setTheme(savedTheme as 'light' | 'dark');
  }
 
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  } 
  toggleTheme(event: any) {
    this.isDarkMode = event.target.checked; // Captura si el interruptor está activado
    const theme = this.isDarkMode ? 'dark' : 'light';
    this.themeService.setTheme(theme); // Cambia el tema
    sessionStorage.setItem('theme', theme); // Guarda el tema en sessionStorage
  }
  

 

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuarioID');
    sessionStorage.removeItem('Nombre'); 
    console.log('Sesión cerrada exitosamente');
        // Redirige al login

    this.router.navigate(['']);
  }

  }



