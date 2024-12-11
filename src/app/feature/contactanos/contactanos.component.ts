import { Component } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent {
// Modelo para almacenar los datos del formulario
contactFormData = {
  name: '',
  phone: '',
  email: '',
  message: ''
};

// Método que se ejecuta al enviar el formulario
onSubmit(): void {
  // Validar si todos los campos están completos
  if (
    this.contactFormData.name &&
    this.contactFormData.phone &&
    this.contactFormData.email &&
    this.contactFormData.message
  ) {
    console.log('Formulario enviado:', this.contactFormData);

    // Aquí puedes realizar la lógica adicional, como enviar los datos a un servidor o API.
    alert('Gracias por contactarnos. Pronto nos pondremos en contacto contigo.');

    // Reiniciar el formulario después de enviarlo
    this.resetForm();
  } else {
    alert('Por favor, completa todos los campos antes de enviar.');
  }
}

// Método para reiniciar los datos del formulario
resetForm(): void {
  this.contactFormData = {
    name: '',
    phone: '',
    email: '',
    message: ''
  };
}
}
