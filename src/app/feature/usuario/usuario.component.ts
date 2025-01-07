import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
    usuario: any = {};
    token: string | null = null;
    isPopupVisible: boolean = false;
    usuarioActualizado: any = {};
    genders = ['Masculino', 'Femenino', 'Otro'];
    constructor(private usuarioService: UsuarioService) {}
  
    ngOnInit(): void {
      // Obtener token del almacenamiento local al iniciar
      this.token = sessionStorage.getItem('token');
      const usuarioID = Number(sessionStorage.getItem('usuarioID'));
      const nombre = sessionStorage.getItem('nombre');
      
      console.log('Token:', this.token);
      console.log('UsuarioID:', usuarioID);
      console.log('Nombre:', nombre);

      if (this.token && usuarioID) {
        this.usuarioService.consultarUsuario(this.token, usuarioID).subscribe(
          (response) => {
            if (response) {
              this.usuario = response; // Asignar datos recibidos
            } else {
              console.error('Datos del usuario no encontrados.');
              console.log('Datos del usuario:', response);

            }
  
          },
          (error) => {
            console.error('Error al cargar el usuario:', error);
          }
        );
      }else {
        console.error('Token o ID de usuario no disponible.');
      }
  
    }
  
    abrirPopup(): void {
      if (this.usuario) {
        this.usuarioActualizado = { ...this.usuario }; // Copia los datos del usuario
        this.isPopupVisible = true;
      } else {
        console.error('No se pudo cargar los datos del usuario para actualizar.');
      }
  
    }
  
  
    actualizarUsuario(): void {
      if (this.token && this.usuarioActualizado) {
        this.usuarioService.actualizarUsuario(this.token, this.usuarioActualizado).subscribe(
          (data) => {
            console.log('Usuario actualizado:', data);
            this.isPopupVisible = false; // Cierra el popup
            this.ngOnInit(); // Recargar datos del usuario
          },
          (error) => {
            console.error('Error al actualizar el usuario:', error);
          }
        );
      } else {
        console.error('Token o datos del usuario no disponibles para actualizar.');
      }
  
    }
  
}
