import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuario.service';
@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})

export class UsuarioComponent implements OnInit {
  usuario: any = {};
  currentUsuario: any = { Nombre: '', Apellido: '', Email: '', Genero: '', FechaNacimiento: null };
  isPopupVisible: boolean = false;
  genders = ['Masculino', 'Femenino', 'Otro'];
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    // Cargar datos del usuario al inicializar el componente
    this.usuario = this.usuarioService.getUsuario()[0];
    this.currentUsuario = { ...this.usuario };
  }

  abrirPopup() {
    this.currentUsuario = { ...this.usuario }; // Copiar datos para edición
    this.isPopupVisible = true;
  }

  cerrarPopup() {
    this.isPopupVisible = false;
  }

  guardarCambios() {
    if (!this.currentUsuario.Nombre || !this.currentUsuario.Apellido || !this.currentUsuario.Email || !this.currentUsuario.Genero) {
      alert('Por favor, complete todos los campos requeridos.');
      return;
    }

    this.usuarioService.updateUsuario(this.usuario.UsuarioID, this.currentUsuario);
    this.usuario = { ...this.currentUsuario };
    this.cerrarPopup();
  }
}