import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  genders = ['Masculino', 'Femenino', 'Otro'];
  
  constructor(private fb: FormBuilder, private router:Router) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\\s]*$')]], // Solo texto

      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: ['', [Validators.required, Validators.minLength(50)]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required, this.birthDateValidator]],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup): any {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  birthDateValidator(control: any): any {
    const today = new Date().toISOString().split('T')[0];
    return control.value === today ? { birthDateInvalid: true } : null;
  }


  onSubmit() {
    this.router.navigate(['']);
  }
}
