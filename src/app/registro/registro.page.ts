import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importa AlertController
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {
  registerForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private alertController: AlertController,
    // Inyecta AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password')?.value === formGroup.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.showErrors();
      return;
    }

    const alert = await this.alertController.create({
      header: 'Registro exitoso',
      message: '¡La cuenta se creo Exitosamente!',
      buttons: ['Ok']
    });
    await alert.present();

    this.router.navigate(['/login']);
  }

  async showErrors() {
    const controls = this.registerForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        const control = controls[name];
        if (control.errors?.['required']) {
          const alert = await this.alertController.create({
            header: 'Campo requerido',
            message: `${this.getFieldLabel(name)} es obligatorio.`,
            buttons: ['Ok']
          });
          await alert.present();
        } else if (control.errors?.['pattern']) {
          const alert = await this.alertController.create({
            header: 'Error en el campo',
            message: `${this.getFieldLabel(name)} no cumple con el formato requerido.`,
            buttons: ['Ok']
          });
          await alert.present();
        } else if (control.errors?.['mismatch']) {
          const alert = await this.alertController.create({
            header: 'Error en las contraseñas',
            message: 'Las contraseñas no coinciden.',
            buttons: ['Ok']
          });
          await alert.present();
        }
        break; 
      }
    }
  }

  getFieldLabel(name: string): string {
    const labels: { [key: string]: string } = {
      name: 'Nombre',
      surname: 'Apellido',
      email: 'Email',
      password: 'Contraseña',
      confirmPassword: 'Confirmar Contraseña'
    };
    return labels[name] || name;
  }
}
