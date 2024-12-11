import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'Sistema CRM';
  description = 'Nuestro sistema CRM gestiona empresas y empleados de manera eficiente y moderna.';
  constructor() {}
}
