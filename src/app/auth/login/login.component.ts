import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router, private usuarioService: UsuarioService) {
    this.loginForm = this.fb.group({
      Email: [''],
      Contrasena: [''],
    });
  }

  iniciarSesion(){
    if (this.loginForm.valid) {
      const { Email, Contrasena } = this.loginForm.value;

      this.usuarioService.iniciarSesion({ Email, Contrasena }).subscribe(
        (response: any) => {
          if (response.token) {
            // Guardar el token en el almacenamiento local
            localStorage.setItem('token', response.token);
            localStorage.setItem('usuarioID', response.usuarioID.toString());
            console.log('Inicio de sesión exitoso:', response);

            // Redirigir al usuario a la página de inicio
            this.router.navigate(['feature/home']);
          } else {
            console.error('Error en la respuesta del servidor:', response);
            alert('Usuario o contraseña incorrectos');
          }
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          alert('Error al iniciar sesión. Inténtalo de nuevo.');
        }
      );
    } else {
      alert('Por favor, llena todos los campos correctamente.');
    }
  }
}
