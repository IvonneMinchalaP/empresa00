import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/Usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  genders = ['Masculino', 'Femenino', 'Otro'];
  
  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) {
    this.registerForm = this.fb.group({
      Nombre: [''],
      Apellido: [''],
      Email: [''],
      Contrasena: [''],
      Genero: [''],
      FechaNacimiento: ['']
    });
  }

 

  birthDateValidator(control: any): any {
    const today = new Date().toISOString().split('T')[0];
    return control.value === today ? { birthDateInvalid: true } : null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // Validación y formato de la fecha de nacimiento
      const fechaNacimiento = formData.FechaNacimiento
        ? new Date(formData.FechaNacimiento).toISOString().split('T')[0]
        : null;

      const usuario = {
        ...formData,
        Genero: formData.Genero.toString(),
        FechaNacimiento: fechaNacimiento, // Fecha formateada
      };

      this.usuarioService.registrarUsuario(usuario).subscribe(
        (response) => {
          alert('Usuario registrado correctamente');
          this.router.navigate(['']);
        },
        (error) => {
          alert('Error al registrar usuario: ' + error.error.mensaje);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
    
  }
}