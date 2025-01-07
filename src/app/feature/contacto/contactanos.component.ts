import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactoService } from 'src/app/services/contacto.service';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
  contactoForm: FormGroup;
 
constructor(private fb: FormBuilder, private router: Router, private contactoService: ContactoService) {
    this.contactoForm = this.fb.group({
      Nombre: [''],
      Telefono: [''],
      Email: [''],
      Mensaje: [''],
    });
  }

  // Método que se ejecuta al enviar el formulario
  onSubmit(): void {
    if (this.contactoForm.valid) {
      const contacto  = this.contactoForm.value;

      this.contactoService.insertarContacto(contacto).subscribe(
        (response) => {
          const mensaje = response?.mensaje || 'Contacto enviado correctamente.';
          alert(mensaje);
          this.contactoForm.reset(); // Vacía el formulario

        },
        (error) => {
          const mensajeError = error?.error?.mensaje || 'Error al enviar contacto.';
          alert(mensajeError);
        }
      );
    } else {
      alert('Por favor, completa todos los campos correctamente.');
    }
    
  }

}

