import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario = [ {
    UsuarioID: 1,
    Nombre: 'Juan',
    Apellido: 'Pérez',
    Email: 'juan.perez@example.com',
    Genero: 'Masculino',
    FechaNacimiento: '1990-01-01'
  },
];

  getUsuario() {
    return this.usuario;
  }

  addUsuario(usuario: any) {
    this.usuario.push(usuario);
  }

  updateUsuario(UsuarioID: number, updateUsuario: any) {
    const index = this.usuario.findIndex((us) => us.UsuarioID === UsuarioID);
    if (index !== -1) {
      this.usuario[index] = { ...this.usuario[index], ...updateUsuario };
    }
  }
}