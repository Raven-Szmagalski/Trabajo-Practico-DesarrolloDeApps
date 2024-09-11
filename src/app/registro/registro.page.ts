import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service'; // Asegúrate de que AuthService esté correctamente importado

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      dni: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]], // Validación para 8 dígitos
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]], // Validación para 10 dígitos
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.showErrors();
      return;
    }

    // Aquí puedes realizar cualquier acción adicional si es necesario,
    // pero no guardaremos nada en localStorage ni en ningún otro lugar.

    Swal.fire({
      title: 'Registro exitoso',
      text: '¡Te has registrado exitosamente!',
      icon: 'success',
      confirmButtonText: 'Ok'
    }).then(() => {
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
    });
  }

  showErrors() {
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        const control = controls[name];
        if (control.errors?.['required']) { // Acceso con indexación
          Swal.fire({
            title: 'Campo requerido',
            text: `${this.getFieldLabel(name)} es obligatorio.`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else if (control.errors?.['pattern']) { // Acceso con indexación
          Swal.fire({
            title: 'Error en el campo',
            text: `${this.getFieldLabel(name)} no cumple con el formato requerido.`,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        } else if (control.errors?.['mismatch']) { // Acceso con indexación
          Swal.fire({
            title: 'Error en las contraseñas',
            text: 'Las contraseñas no coinciden.',
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
        break; // Mostrar solo el primer error encontrado
      }
    }
  }

  getFieldLabel(name: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      surname: 'Apellido',
      dni: 'DNI',
      phone: 'Celular',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña'
    };
    return labels[name] || name;
  }
}