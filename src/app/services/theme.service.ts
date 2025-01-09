import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themeLink: HTMLLinkElement | null = null;

  constructor(private router: Router) {
    this.initTheme();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkExcludedRoutes();
        }
      });
  }

  private initTheme() {
    this.themeLink = document.createElement('link');
    this.themeLink.rel = 'stylesheet';
    this.themeLink.id = 'app-theme';
    this.themeLink.href = 'assets/styles/theme-light.css'; // Ruta actualizada
    document.head.appendChild(this.themeLink);
  }
  
  setTheme(theme: 'light' | 'dark') {
    if (this.themeLink) {
      this.themeLink.href = `assets/styles/theme-${theme}.css`; // Ruta actualizada
    }
  }
  

  private checkExcludedRoutes() {
    const excludedRoutes = ['/login', '/register'];
    if (excludedRoutes.includes(this.router.url)) {
      this.setTheme('light'); // Forzar tema claro
    }
  }
}

